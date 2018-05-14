import {DataStorage} from '../../../src/storage/data/data.storage';
import {Types} from 'mongoose';

export class MockCoffeeStore extends DataStorage {
   constructor({source}) {
      super();
      this.coffees = source;
   }
   
   all() {
      return Promise.resolve([...this.coffees]);
   }
   
   byId(id) {
      return Promise.resolve(this.coffees.filter(c => c._id === id)[0]);
   }
   
   save(coffee) {
      coffee._id = new Types.ObjectId;
      this.coffees.push(coffee);
      return Promise.resolve(coffee);
   }
   
   update(coffee) {
      this.coffees.forEach((c) => {
         if ( c._id === coffee._id ) {
            Object.assign(c, coffee);
         }
      });
      return Promise.resolve(coffee);
   }
   
   remove(id) {
      this.coffees = this.coffees.filter(c => c._id !== id);
      return Promise.resolve(true);
   }
}
