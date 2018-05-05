export function consumes(contentType) {
    return (ctx, next) => {
        if ( !ctx.is(contentType) ) {
            ctx.throw(415, `This resource consumes: ${contentType}`);
        }
        else {
            next();
        }
    };
};

export function produces(...acceptList) {
    return (ctx, next) => {
        if ( ctx.accepts(acceptList) ) {
            next();
        }
        else {
            ctx.throw(406, `This resource can produce: ${acceptList}. Change the accept header accordingly`);
        }
    };
};