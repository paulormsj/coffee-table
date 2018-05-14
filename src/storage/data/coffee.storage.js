import {DataStorage} from './data.storage';
import {CoffeeDocument} from '../../model/coffee';


export class CoffeeStorage extends DataStorage {
   
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

