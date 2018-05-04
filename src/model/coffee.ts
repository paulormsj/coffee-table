import {Document, Model, model, Schema} from 'mongoose';
import * as _ from 'lodash';

export interface Coffee extends Document {
   description: string;
   price: number;
   id: number;
   name: string;
}

const coffeeSchema = new Schema({
   description: String,
   price: Number,
   id: Number,
   name: String
});


const CoffeeDocument: Model<Coffee> = model<Coffee>('Coffee', coffeeSchema, 'coffees');

export function coffeeMaker(flavor?: Partial<Coffee>): Coffee {
   if ( _.isNil(flavor.name) ) {
      throw new Error(`a coffee must have a name`);
   }
   return new CoffeeDocument(flavor);
}


// export class Coffee {
//    private description: string | null = null;
//    private price: number | null = null;
//    private id: number | null = null;
//    private name: string = '';
//
//    constructor(coffee?: Partial<{ name: string, price: number, id: number, description: string }>) {
//       Object.assign(this, coffee);
//       assert(this.getName()! && !_.isEmpty(this.getName()), 'A name must be provided');
//    }
//
//
//    setId(value: number) {
//       this.id = value;
//       return this;
//    }
//
//
//    setName(value) {
//       this.name = value;
//       return this;
//    }
//
//
//    setPrice(value) {
//       this.price = value;
//       return this;
//    }
//
//    setDescription(value) {
//       this.description = value;
//       return this;
//    }
//
//
//    getName() {
//       return _.clone(this.name);
//    }
//
//    getPrice() {
//       return _.clone(this.price);
//    }
//
//    getDescription() {
//       return _.clone(this.description);
//    }
//
//    getId() {
//       return _.clone(this.id);
//    }
//
// }

