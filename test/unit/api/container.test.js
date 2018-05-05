import {asClass, asFunction, asValue, createContainer} from 'awilix';
import * as _ from 'lodash';


export function testContainerBuilder(classes, functions, values) {
   const container = createContainer();
   if ( classes ) {
      classes.forEach(c => {
         if ( typeof(c) === 'object' ) {
            container.register(c.name, asClass(c.clazz));
         }
      });
   }
   if ( functions ) {
      functions.forEach(f => container.register(_.camelCase(f.name), asFunction(f)));
   }
   if ( values ) {
      for (const variable in values) {
         if ( values.hasOwnProperty(variable) ) {
            container.register(variable, asValue(values[variable]));
         }
      }
   }
   return container;
   
};