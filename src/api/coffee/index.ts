import {Request, Response, Router} from 'express';
import {consumes, produces} from 'middleware/middlewares';
import {Coffee} from 'model/coffee';
import {CoffeeService} from 'service/coffee.service';

const inject = require('awilix-express').inject;

const mRouter = Router();

const getCoffees = (req: Request | any, res: Response) => {
   const coffeeService: CoffeeService = req.coffeeService;
   return res.send(coffeeService.all());
};

const saveCoffees = (req: Request | any, res: Response) => {
   const coffeeService: CoffeeService = req.coffeeService;
   return res.send(coffeeService.saveCoffee(new Coffee(req.body)));
};

mRouter.get('/', inject('coffeeService'), produces('application/json'), getCoffees);

mRouter.post('/', inject('coffeeService'), consumes('application/json'), produces('application/json'), saveCoffees);


export const router: Router = mRouter;