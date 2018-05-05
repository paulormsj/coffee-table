export class CoffeeService {
    
    
    constructor({coffeeStore}) {
        this._coffeStore = coffeeStore;
    }
    
    saveCoffee(coffee) {
        return this._coffeStore.save(coffee);
    }
    
    getCoffeeById(id) {
        return this._coffeStore.byId(id);
    }
    
    all() {
        return this._coffeStore.all();
    }
    
    removeCoffee(id) {
        return this._coffeStore.remove(id);
    }
    
    updateCoffee(coffee) {
        return this._coffeStore.update(coffee);
    }
    
    
}

