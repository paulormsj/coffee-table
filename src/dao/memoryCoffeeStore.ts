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
      return this.coffees.filter(c => c.id === id)[0];
   }
   
   save(coffee): Coffee {
      coffee.id = this.coffees.length + 1;
      this.coffees.push(coffee);
      return coffee;
   }
   
   update(coffee): Coffee {
      this.coffees.forEach((c) => {
         if ( c.id === coffee.id ) {
            Object.assign(c, coffee);
         }
      });
      return coffee;
   }
   
   remove(id): boolean {
      this.coffees = this.coffees.filter(c => c.id !== id);
      return true;
   }
}

