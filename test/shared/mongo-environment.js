import {execSync} from 'child_process';

const mongoose = require('mongoose');

const dockerCMD = 'docker run -d --name coffee-table-storage --rm -p 27017:27017 -e MONGO_INITDB_DATABASE=coffee-table-test -e MONGO_INITDB_ROOT_USERNAME=test -e MONGO_INITDB_ROOT_PASSWORD=test coffee-table-mongo-test';
const dockerDownCMD = 'docker container stop coffee-table-storage';
const uri = 'mongodb://127.0.0.1:27017';
const opts = {
   'dbName': 'coffee-table-test',
   'user': 'test',
   'pass': 'test',
   'poolSize': 35,
   autoReconnect: true,
   connectTimeoutMS: 1000
};

export async function setup() {
   
   try {
      execSync(dockerCMD);
      
      return new Promise(resolve => setTimeout(resolve, 9000)).then(() => mongoose.connect(uri, opts));
   } catch (err) {
      return Promise.reject(err);
   }
}

export function tearDown() {
   try {
      return mongoose.disconnect().then(() => {
         execSync(dockerDownCMD);
      });
   } catch (err) {
      return Promise.reject(err);
   }
}




