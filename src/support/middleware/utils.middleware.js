export function consumes(contentType) {
   return async (ctx, next) => {
      if ( !ctx.is(contentType) ) {
         ctx.throw(415, `This resource consumes: ${contentType}`);
      } else {
         await next();
      }
   };
};

export function produces(...acceptList) {
   return async (ctx, next) => {
      if ( ctx.accepts(acceptList) ) {
         await next();
      } else {
         ctx.throw(406, `This resource can produce: ${acceptList}. Change the accept header accordingly`);
      }
   };
};

export function storageAvailable() {
   return async (ctx, next) => {
      try {
         const storage = ctx.state.container.resolve('appStorage');
         if ( await storage.isAvailable() ) {
            return next();
         }
      } catch (err) {
         const logger = ctx.state.container.resolve('logger');
         logger.error(err);
      }
      ctx.throw(503, 'it is not possible to execute this operation right now. if this problem persists contant the'
                     + ' system admin');
   };
}


