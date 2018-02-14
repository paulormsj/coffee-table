import {expect} from 'chai';

import {Coffee} from '../../src/model/coffee';

describe('Trying different coffees', () => {
    it('should throw an error without name', () => {
        expect(Coffee).to.throw();
        const myCoffee = () => {new Coffee('');};
        expect(myCoffee).to.throw();
    });
    
    it('should make a coffee', () => {
        expect(Coffee).to.throw();
        const myCoffee = () => { return new Coffee('maratá').setPrice(5.50).setDescription('é maratá');};
        expect(myCoffee).to.be;
        expect(myCoffee().name).to.be.equal('maratá');
        expect(myCoffee().description).to.be.equal('é maratá');
        expect(myCoffee().price).to.be.equal(5.50);
    });
    
    
});