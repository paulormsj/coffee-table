import {mainRoute} from './src/api/routes.api';
import * as _ from 'lodash';

const Koa = require('koa');

export function appBuilder({preRouteMiddlewares, posRouteMiddlewares, errorHandlingMiddlewares}) {
   const app = new Koa();
   if ( !_.isNil(preRouteMiddlewares) ) {
      preRouteMiddlewares.forEach(m => app.use(m));
   }
   app.use(mainRoute.routes());
   if ( !_.isNil(posRouteMiddlewares) ) {
      posRouteMiddlewares.forEach(m => app.use(m));
   }
   if ( !_.isNil(errorHandlingMiddlewares) ) {
      errorHandlingMiddlewares.forEach(m => app.use(m));
   }
   return app;
}