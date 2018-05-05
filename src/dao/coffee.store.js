import {DataStore} from './data.store';
import {CoffeeDocument} from '../model/coffee';


export class CoffeeStore extends DataStore {
   
   all(query) {
      return CoffeeDocument.find(query || {}).then();
   }
   
   byId(id) {
      return CoffeeDocument.findById(id).then();
   }
   
   save(coffee) {
      return coffee.save();
   }
   
   update(coffee) {
      return coffee.update().then();
   }
   
   remove(id) {
      this.coffees = this.coffees.filter(c => c._id !== id);
      return true;
   }
}

