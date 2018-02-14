import {Router} from 'express';
import {router as coffeeRouter} from './coffee/index';


const mRouter: Router = Router();
mRouter.use('/coffee', coffeeRouter);

export const router = mRouter;

