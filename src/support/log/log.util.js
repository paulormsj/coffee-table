import * as winston from 'winston/lib/winston';

const {combine, timestamp, colorize, json, label, simple} = winston.format;

const standard = {
   transports: [
      new winston.transports.Console()
   ]
};

export function loggerBuilder({level, isSimple, tag}) {
   let format = isSimple ? combine(timestamp(), json()) : combine(colorize(), timestamp(), simple());
   format = tag ? combine(label({tag: tag}), format) : format;
   return winston.createLogger(Object.assign(standard, {
      level: level,
      format: format
   }));
}