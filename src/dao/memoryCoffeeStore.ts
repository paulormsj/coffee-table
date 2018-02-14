import {Coffee} from '../model/coffee';
import {DataStore} from './dataStore';

const _ = require('lodash');
const assert = require('assert');

export class MemoryCoffeeStore implements DataStore {
   private coffees: Array<Coffee> = [];

   constructor(options: { source: Array<Coffee> }) {
      this.coffees = options.source;
   }

   all(): Array<Coffee> {
      return new Array(...this.coffees);
   }

   byId(id): Coffee {
      return this.coffees.filter(c => c.getId() === id)[0];
   }

   save(coffee): Coffee {
      coffee.setId(this.coffees.length + 1);
      this.coffees.push(coffee);
      return coffee;
   }

   update(coffee): Coffee {
      this.coffees.forEach((c) => {
         if (c.getId() === coffee.getId()) {
            Object.assign(c, coffee);
         }
      });
      return coffee;
   }

   remove(id): boolean {
      this.coffees = this.coffees.filter(c => c.getId() !== id);
      return true;
   }
}

module.exports = MemoryCoffeeStore;