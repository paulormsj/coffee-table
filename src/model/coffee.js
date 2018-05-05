import * as _ from 'lodash';

const mongoose = require('mongoose');


export class Coffee extends mongoose.Document {
   constructor() {
      super();
      this.description = null;
      this.price = null;
      this.name = null;
   }
}

const coffeeSchema = new mongoose.Schema({
   description: String,
   price: Number,
   name: String
});


const CoffeeDocument = mongoose.model('Coffee', coffeeSchema, 'coffees');

export function coffeeMaker(flavor) {
   if ( _.isNil(flavor) || _.isNil(flavor.name) ) {
      throw new Error(`a coffee must have a name`);
   }
   return new CoffeeDocument(flavor);
}
