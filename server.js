import {appBuilder, AppConfig} from './app';
import * as winston from 'winston';

const production = process.env.NODE_ENV === 'production';

const logger = winston.createLogger({
   level: production ? 'info' : 'debug',
   format: winston.format.combine(winston.format.colorize(),
      winston.format.timestamp(),
      production ? winston.format.json() : winston.format.simple()),
   transports: [
      new winston.transports.Console()
   ]
});

logger.format = winston.format.combine(logger.format, winston.format.);

const preRouteMiddlewares = [
   require('koa-body')()
];

const config = {
   preRouteMiddlewares: preRouteMiddlewares
};

appBuilder(config).listen(3000, () => {
   logger.info('i\'m listening');
   process.send && process.send('ready');
});


