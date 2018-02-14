import {ErrorRequestHandler, RequestHandler} from 'express';
import {router} from './src/api/routes';


const express = require('express');

export const appBuilder = (config: {
    preRouteMiddlewares?: Array<RequestHandler>;
    posRouteMiddlewares?: Array<RequestHandler>,
    errorHandllingMiddlewares?: Array<ErrorRequestHandler>
} = {}) => {
    const configuration = Object.assign({
                                            preRouteMiddlewares: [],
                                            posRouteMiddlewares: [],
                                            errorHandllingMiddlewares: []
                                        }, config);
    const app = express();
    app.use(express.json());
    configuration.preRouteMiddlewares.forEach(m => app.use(m));
    app.use('/api', router);
    configuration.posRouteMiddlewares.forEach(m => app.use(m));
    configuration.errorHandllingMiddlewares.forEach(m => app.use(m));
    return app;
};