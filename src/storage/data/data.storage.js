export class DataStorage {
   
   /**
    * must return a Promise that resolves to an Array
    */
   all() {};
   
   /**
    * must return a Promise that resolves to an object whoose id is equal to the informed param
    * @param id
    */
   byId(id) {};
   
   /**
    * must return a Promise that resolves to an object that corresponds to the result of saving the object passed as
    * param
    * @param data
    */
   save(data) {};
   
   /**
    * must return a promise that resolves to a boolean indicating if the data whose id corresponds to the informed
    * param has been removed from the store
    * @param id
    */
   remove(id) {};
   
   /**
    * must return a promise that resolves to an object that corresponds  to the object informed as param after being
    * updated in the storage
    * @param data
    */
   update(data) {};
}

