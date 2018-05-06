import {router as coffeeRouter} from './coffee.api';
import Router from 'koa-router';
import {audit, log} from '../support/middleware/logger.middleware';


export const mainRoute = new Router();
const subroutes = new Router();
subroutes.use('/coffee', log({tag: 'coffee'}), coffeeRouter.routes());
mainRoute.use('/api', log({tag: 'audit'}), audit(), subroutes.routes());
