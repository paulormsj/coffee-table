import {coffeeMaker} from '../model/coffee';
import {consumes, produces, storageAvailable} from '../support/middleware/utils.middleware';
import {makeClassInvoker} from 'awilix-koa';

export const router = require('koa-router')();

class CoffeeApi {
   
   constructor({coffeeService}) {
      this.coffeeService = coffeeService;
   }
   
   async getCoffees(ctx) {
      ctx.body = await this.coffeeService.all();
   }
   
   async saveCoffee(ctx) {
      const result = await this.coffeeService.saveCoffee(coffeeMaker(ctx.request.body));
      return ctx.body = result;
   }
};

const apiInvoker = makeClassInvoker(CoffeeApi);


// router.use(storageAvailable());

router.get('/', produces('application/json'), apiInvoker('getCoffees'));
router.post('/', consumes('application/json'), apiInvoker('saveCoffee'));
