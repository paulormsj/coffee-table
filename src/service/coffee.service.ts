import {DataStore} from '../dao/dataStore';
import {Coffee} from '../model/coffee';

export class CoffeeService {
    
    private _coffeStore: DataStore;
    
    constructor(options: { coffeeStore: DataStore }) {
        this._coffeStore = options.coffeeStore;
    }
    
    saveCoffee(coffee): Coffee {
        return this._coffeStore.save(coffee);
    }
    
    getCoffeeById(id): Coffee {
        return this._coffeStore.byId(id);
    }
    
    all(): Array<Coffee> {
        return this._coffeStore.all();
    }
    
    removeCoffee(id): boolean {
        return this._coffeStore.remove(id);
    }
    
    updateCoffee(coffee): Coffee {
        return this._coffeStore.update(coffee);
    }
    
    
}

