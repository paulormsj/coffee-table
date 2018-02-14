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
        if (acceptList.length === 0 || !req.header('accept')
            || acceptList.every(type => req.accepts(type) === undefined)) {
            res.status(406).send(`This resource can produce: ${acceptList}. Change the accept header accordingly`);
        } else {
            next();
        }
    };
};