export interface DataStore {
    
    all(): Array<any>;
    
    byId(id): any;
    
    save(data): any;
    
    remove(id): boolean;
    
    update(data): any;
}

