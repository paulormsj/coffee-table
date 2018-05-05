import {loggerBuilder} from '../log/log.util';

const production = process.env.NODE_ENV === 'production';
const level = production ? 'info' : 'debug';

export async function log({tag}){
   return async (ctx, next) => {
      ctx.logger = loggerBuilder({level, production, tag});
      next();
   }
}

export async function audit(ctx, next) {
   ctx.logger && ctx.logger.info(`receiving request on ${ctx.request.url}`);
   next();
}

