import {CoffeeService} from '../../../src/service/coffee.service';
import {CoffeeStorage} from '../../../src/storage/data/coffee.storage';
import * as mongoEnv from '../../shared/mongo-environment';
import {testContainerBuilder} from '../../shared/container';
import {MongoStorage} from '../../../src/storage/mongo.storage';
import {expect} from 'chai';
import {appBuilder} from '../../../app';

const axios = require('axios');


const awilixKoa = require('awilix-koa');


describe('Coffee  + Mongoose Testing', function () {
   
   const url = 'http://localhost:3000/api/';
   let server;
   
   const classes = [{name: 'coffeeService', clazz: CoffeeService}, {name: 'coffeeStore', clazz: CoffeeStorage}];
   const appConfig = {
      log: {level: 'nothing'},
      production: false
   };
   
   let axiosInstance;
   
   this.timeout(15000);
   
   before((done) => {
      const container = testContainerBuilder(classes, [], {'appConfig': appConfig, 'appStorage': new MongoStorage()});
      mongoEnv.setup()
              .then(() => {
                 axiosInstance = axios.default.create({baseURL: url});
                 server = appBuilder({
                    preRouteMiddlewares: [require('koa-body')(), awilixKoa.scopePerRequest(container)]
                 }).listen(3000, done);
              })
              .catch((e) => {
                 done(e);
              });
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
      }).then((response) => {
         const saved = response.data;
         expect(saved).to.include(coffee).and.to.have.property('_id').and.is.not.null;
         done();
      }).catch(done);
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
   
   
   after((done) => {
      mongoEnv.tearDown().then(() => server.close(done)).catch(done);
   });
});
