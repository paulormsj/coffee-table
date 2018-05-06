import {loggerBuilder} from '../log/log.util';
import {asValue} from 'awilix';

export function log({tag}) {
   return async (ctx, next) => {
      const configuration = ctx.state.container.resolve('appConfig');
      ctx.state.container.register('logger', asValue(loggerBuilder({
         level: configuration.log.level, inProduction: configuration.production, tag
      })));
      await next();
   };
}

export function audit() {
   return async (ctx, next) => {
      const logger = ctx.state.container.resolve('logger');
      logger && logger.info(`receiving request on ${ctx.request.url}`);
      await next();
   };
}

