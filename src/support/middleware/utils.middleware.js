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
         await  next();
      } else {
         ctx.throw(406, `This resource can produce: ${acceptList}. Change the accept header accordingly`);
      }
   };
};