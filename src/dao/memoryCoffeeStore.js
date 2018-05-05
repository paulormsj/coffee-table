import {DataStore} from './dataStore';
import {Types} from 'mongoose';

const _ = require('lodash');
const assert = require('assert');

export class MemoryCoffeeStore extends DataStore {
   constructor({source}) {
      super();
      this.coffees = source || [];
   }
   
   all() {
      return new Array(...this.coffees);
   }
   
   byId(id) {
      return this.coffees.filter(c => c._id === id)[0];
   }
   
   save(coffee) {
      coffee._id = new Types.ObjectId;
      this.coffees.push(coffee);
      return coffee;
   }
   
   update(coffee) {
      this.coffees.forEach((c) => {
         if ( c._id === coffee._id ) {
            Object.assign(c, coffee);
         }
      });
      return coffee;
   }
   
   remove(id) {
      this.coffees = this.coffees.filter(c => c._id !== id);
      return true;
   }
}

