import {Storage} from './storage';


export class MongoStorage extends Storage {
   
   constructor() {
      super();
      this.mongoose = require('mongoose');
   }
   
   
   isAvailable() {
      return Promise.resolve(this.mongoose.connection.readyState === 1);
   }
}