import * as winston from 'winston';

const {combine, timestamp, colorize, json, label, simple} = winston.format;

const standard = {
   transports: [
      new winston.transports.Console()
   ]
};

export function loggerBuilder({level, inProduction, tag}) {
   if ( !winston.loggers.has(tag) ) {
      let format = inProduction ? combine(timestamp(), json()) : combine(colorize(), timestamp(), simple());
      format = tag ? combine(label({tag: tag}), format) : format;
      Object.assign(standard, {
         level: level,
         format: format
      });
      winston.loggers.add(tag, standard);
   }
   return winston.loggers.get(tag);
}