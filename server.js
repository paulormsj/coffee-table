import {appBuilder, AppConfig} from './app';


const preRouteMiddlewares = [
    require('koa-body')()
];

const config = {
    preRouteMiddlewares: preRouteMiddlewares
};

appBuilder(config).listen(3000, () => {
});


