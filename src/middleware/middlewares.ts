import {isNil} from 'lodash';

export const consumes = (contentType) => {
   return (req, res, next) => {
      if (contentType !== req.header('content-type')) {
         res.status(415).send(`This resource consumes: ${contentType}`);
      } else {
         next();
      }
   }
};

export const produces = (...acceptList) => {
   return (req, res, next) => {

      let shallPass: boolean = isNil(req.header('accept')) ||
                               acceptList.some((accept: string) => {
                                  if (req.accepts(accept)) {
                                     res.contentType(accept);
                                     return true;
                                  }
                                  return false;
                               });


      if (shallPass) {
         next()
      } else {
         res.status(406).send(`This resource can produce: ${acceptList}. Change the accept header accordingly`);
      }
   };
};