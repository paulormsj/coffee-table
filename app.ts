import {mainRoute} from './src/api/routes';
import {Middleware} from 'koa';

const Koa = require('koa');

export interface AppConfig {
   preRouteMiddlewares?: Middleware[];
   posRouteMiddlewares?: Middleware[];
   errorHandlingMiddlewares?: Middleware[];
}

export const appBuilder = (config: AppConfig) => {
   const app = new Koa();
   if ( config.preRouteMiddlewares ) {
      config.preRouteMiddlewares.forEach(m => app.use(m));
   }
   app.use(mainRoute.routes());
   if ( config.posRouteMiddlewares ) {
      config.posRouteMiddlewares.forEach(m => app.use(m));
   }
   if ( config.errorHandlingMiddlewares ) {
      config.errorHandlingMiddlewares.forEach(m => app.use(m));
   }
   return app;
};