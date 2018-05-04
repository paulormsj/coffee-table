import {coffeeMaker} from 'model/coffee';
import {CoffeeService} from 'service/coffee.service';
import {Context} from 'koa';
import {consumes, produces} from 'support/middlewares';
import {makeClassInvoker} from 'awilix-koa';

export const router = require('koa-router')();

class CoffeeApi {
   private coffeeService: CoffeeService;
   
   constructor(config: { coffeeService: CoffeeService }) {
      this.coffeeService = config.coffeeService;
   }
   
   getCoffees(ctx: Context) {
      ctx.body = this.coffeeService.all();
   }
   
   saveCoffee(ctx: Context) {
      const result = this.coffeeService.saveCoffee(coffeeMaker((<any>ctx.request).body));
      return ctx.body = result;
   }
};

const apiInvoker = makeClassInvoker(CoffeeApi);


router.get('/', produces('application/json'), apiInvoker('getCoffees'));
router.post('/', consumes('application/json'), apiInvoker('saveCoffee'));
