import {expect} from 'chai';
import request from 'request';
import {appBuilder} from '../../app';
import {Coffee} from '../../src/model/coffee';
import {CoffeeService} from '../../src/service/coffee.service';
import {containerBuilder} from './container.test';

const awilixExpress = require('awilix-express');
const MemoryCoffeeStore = require('../../src/dao/memoryCoffeeStore');

describe('Coffee API Testing', () => {
   const url = 'http://localhost:3000/api/coffee';
   let server;

   before((done) => {
      const coffee: Coffee = new Coffee({name: 'maratá'}).setId(1);
      const container = containerBuilder([CoffeeService, {name: 'coffeeStore', 'class': MemoryCoffeeStore}],
                                         [],
                                         {
                                            'source': [coffee]
                                         });
      server = appBuilder({preRouteMiddlewares: [awilixExpress.scopePerRequest(container)]}).listen(3000, done);

   });

   it('should return the accepted values', (done) => {
      request(url, {headers: {'Accept': 'application/xml'}}, (err, res, body) => {
         expect(err).to.be.null;
         expect(body).to.be
            .equal(`This resource can produce: application/json. Change the accept header accordingly`);
         done();
      });
   });


   it('should return the coffee list', (done) => {
      request.get(url, {
         headers: {
            'Accept': 'application/json'
         }
      }, (err, res, body) => {
         expect(err).to.be.null;
         const coffees: Coffee[] = JSON.parse(body);
         expect(coffees)
            .to
            .be
            .deep
            .equal([{
               name: 'maratá',
               price: null,
               description: null,
               id: 1
            }]);
         done();
      });
   });

   it('should save my coffee', (done) => {
      const coffee = {
         name: 'Pilão',
         price: 5.95,
         description: 'O café número 1'
      };
      request.post(url, {
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(coffee)
      }, (err, res, body) => {
         expect(err).to.be.null;
         const saved = JSON.parse(body);
         expect(saved).to.have.property('id', 2);
         expect(saved).to.be.include(coffee);
         done();
      });
   });

   after((done) => {
      server.close(() => {
         done();
      });
   });
});