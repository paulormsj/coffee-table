import {Request, Response, Router} from 'express';
import {produces} from '../../middleware/middlewares';
import {CoffeeService} from '../../service/coffee.service';

const inject = require('awilix-express').inject;

const mRouter = Router();


mRouter.get('/', inject('coffeeService'), produces('application/json'), (req: Request | any, res: Response) => {
    
    const coffeeService: CoffeeService = req.coffeeService;
    if ( coffeeService ) {
        return res.send(coffeeService.all());
    }
    else {
        res.send(['blá']);
    }
    
});


export const router: Router = mRouter;