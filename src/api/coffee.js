import {coffeeMaker} from '../model/coffee';
import {consumes, produces} from '../support/middlewares';
import {makeClassInvoker} from 'awilix-koa';

export const router = require('koa-router')();

class CoffeeApi {
    
    constructor({coffeeService}) {
        this.coffeeService = coffeeService;
    }
    
    getCoffees(ctx) {
        ctx.body = this.coffeeService.all();
    }
    
    saveCoffee(ctx) {
        const result = this.coffeeService.saveCoffee(coffeeMaker(ctx.request.body));
        return ctx.body = result;
    }
};

const apiInvoker = makeClassInvoker(CoffeeApi);


router.get('/', produces('application/json'), apiInvoker('getCoffees'));
router.post('/', consumes('application/json'), apiInvoker('saveCoffee'));
