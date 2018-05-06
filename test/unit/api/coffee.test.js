import {expect} from 'chai';
import request from 'request';
import {appBuilder} from '../../../app';
import {coffeeMaker} from '../../../src/model/coffee';
import {CoffeeService} from '../../../src/service/coffee.service';
import {MockCoffeeStore} from '../mocks/mock-coffee.store';
import {testContainerBuilder} from './container.test';

const awilixKoa = require('awilix-koa');

describe('Coffee API Testing', () => {
   const url = 'http://localhost:3000/api/coffee';
   let server;
   
   const classes = [{name: 'coffeeService', clazz: CoffeeService}, {name: 'coffeeStore', clazz: MockCoffeeStore}];
   const appConfig = {
      log: {level: 'nothing'},
      production: false
   };
   
   before((done) => {
      const coffee = coffeeMaker({name: 'maratá', id: 1});
      const container = testContainerBuilder(classes, [],
         {
            'source': [coffee],
            'appConfig': appConfig
         });
      server = appBuilder({preRouteMiddlewares: [require('koa-body')(), awilixKoa.scopePerRequest(container)]})
         .listen(
            3000,
            done);
      
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
         const coffees = JSON.parse(body);
         expect(coffees[0])
            .to
            .contain({
               name: 'maratá'
            });
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
         expect(saved).to.include(coffee);
         done();
      });
   });
   
   after((done) => {
      server.close(() => {
         done();
      });
   });
});