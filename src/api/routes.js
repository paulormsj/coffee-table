import {router as coffeeRouter} from './coffee';
import Router from 'koa-router';


export const mainRoute = new Router();
const subroutes = new Router();
subroutes.use('/coffee', coffeeRouter.routes());
mainRoute.use('/api', subroutes.routes());
