import {appBuilder, AppConfig} from './app';
import {asValue, createContainer} from 'awilix';
import {scopePerRequest} from 'awilix-koa';
import {loggerBuilder} from './src/support/log/log.util';

const mongoose = require('mongoose');


const production = process.env.NODE_ENV === 'production';

const configuration = {
   log: {
      level: production ? 'info' : 'debug'
   },
   production: process.env.NODE_ENV && process.env.NODE_ENV !== 'development',
   mongo: {
      uri: '',
      opts: {}
   }
};

const customConfiguration = process.env.CONF_FILE_PATH ? require(process.env.CONF_FILE_PATH) : {};
Object.assign(configuration, customConfiguration);

const logger = loggerBuilder({level: configuration.log.level, inProduction: configuration.production, tag: 'app'});

logger.debug(JSON.stringify(configuration));

const appContainer = createContainer();

appContainer.loadModules([
   './src/dao/*.js',
   './src/service/*.js'
], {
   formatName: 'camelCase'
});

appContainer.register('appConfig', asValue(configuration));
appContainer.register('appContainer', asValue(appContainer));
appContainer.register('logger',
   asValue(logger));

mongoose.connect(configuration.mongo.uri, configuration.mongo.opts)
        .then(() => logger.info('connected to database'))
        .catch(err => logger.error(err));


const preRouteMiddlewares = [
   require('koa-body')(),
   scopePerRequest(appContainer)
];

const config = {
   preRouteMiddlewares: preRouteMiddlewares
};

appBuilder(config).listen(3000, () => {
   logger.info('i\'m listening');
   process.send && process.send('ready');
});


