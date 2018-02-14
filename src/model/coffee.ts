const _ = require('lodash');
const assert = require('assert');

export class Coffee {
    
    private _description: string = '';
    private _price: number | null = null;
    private _id: number | null = null;
    
    constructor(private _name: string) {
        assert(!_.isUndefined(_name) && !_.isNull(_name) && !_.isEmpty(_name), 'A name must be provided');
    }
    
    toJSON(key: any): any {
        const json = {};
        for (const key in this) {
            if ( this.hasOwnProperty(key) ) {
                if ( key[0] === '_' ) {
                    json[key.substr(1)] = this[key];
                }
                else {
                    json[key.substr(0)] = this[key];
                }
            }
        }
        return json;
    }
    
    set id(value: number) {
        this._id = value;
    }
    
    setId(value: number) {
        this.id = value;
        return this;
    }
    
    set name(value) {
        this._name = value;
    }
    
    setName(value) {
        this.name = value;
        return this;
    }
    
    set price(value) {
        this._price = value;
    }
    
    setPrice(value) {
        this.price = value;
        return this;
    }
    
    set description(value) {
        this._description = value;
    }
    
    setDescription(value) {
        this.description = value;
        return this;
    }
    
    
    get name() {
        return _.clone(this._name);
    }
    
    get price() {
        return _.clone(this._price);
    }
    
    get description() {
        return _.clone(this._description);
    }
    
    get id() {
        return _.clone(this._id);
    }
    
}

