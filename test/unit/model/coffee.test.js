import {expect} from 'chai';

import {coffeeMaker} from '../../../src/model/coffee';

describe('Trying different coffees', () => {
   it('should throw an error without name', () => {
      expect(coffeeMaker).to.throw();
   });
   
   it('should make a coffee', () => {
         const myCoffee = () => {
               return coffeeMaker({name: 'maratá', price: 5.50, description: 'é maratá'});
            }
         ;
         expect(myCoffee).to.be;
         expect(myCoffee().name).to.be.equal('maratá');
         expect(myCoffee().description).to.be.equal('é maratá');
         expect(myCoffee().price).to.be.equal(5.50);
      }
   );
   
   
});