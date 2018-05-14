import {expect} from 'chai';
import {appBuilder} from '../../../app';
import {coffeeMaker} from '../../../src/model/coffee';
import {CoffeeService} from '../../../src/service/coffee.service';
import {MockCoffeeStore} from '../mocks/mock-coffee.store';
import {testContainerBuilder} from '../../shared/container';

const axios = require('axios');

const awilixKoa = require('awilix-koa');

describe('Coffee API Testing', () => {
   const url = 'http://localhost:3000/api';
   let server;
   
   const classes = [{name: 'coffeeService', clazz: CoffeeService}, {name: 'coffeeStore', clazz: MockCoffeeStore}];
   const appConfig = {
      log: {level: 'nothing'},
      production: false
   };
   
   let axiosInstance;
   
   before((done) => {
      const coffee = coffeeMaker({name: 'maratá', id: 1});
      const container = testContainerBuilder(classes, [],
         {
            'source': [coffee],
            'appConfig': appConfig,
            'appStorage': {isAvailable: () => true}
         });
      server = appBuilder({preRouteMiddlewares: [require('koa-body')(), awilixKoa.scopePerRequest(container)]})
         .listen(
            3000,
            done);
      
      axiosInstance = axios.default.create({
         baseURL: url
      });
      
   });
   
   it('should return the accepted values', (done) => {
      axiosInstance.get('/coffee', {headers: {'Accept': 'application/xml'}}).then().catch(error => {
         expect(error.response.data).to.be
                                    .equal(`This resource can produce: application/json. Change the accept header accordingly`);
         done();
      });
   });
   
   
   it('should return the coffee list', (done) => {
      axiosInstance.get('/coffee', {
         headers: {
            'Accept': 'application/json'
         }
      }).then(response => {
         const coffees = response.data;
         expect(coffees[0])
            .to
            .contain({
               name: 'maratá'
            });
         done();
      }).catch(done);
   });
   
   it('should save my coffee', (done) => {
      const coffee = {
         name: 'Pilão',
         price: 5.95,
         description: 'O café número 1'
      };
      axiosInstance.post('/coffee', JSON.stringify(coffee), {
         headers: {
            'Content-type': 'application/json'
         }
      }).then(response => {
         const saved = response.data;
         expect(saved).to.include(coffee);
         done();
      }).catch(done);
   });
   
   after((done) => {
      server.close(() => {
         done();
      });
   });
});