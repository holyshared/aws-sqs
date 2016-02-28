import loader from 'toml-require';

loader.install();

import path from 'path';
import log4js from 'log4js';

export default {
  Configration: Configration,
  fromFile: fromFile
}

class Configration {
  constructor(config, env) {
    const enviroment = env || 'development';
    const queue = config.queue || { watchInterval: 5000 };
    const loggers = config.loggers || [ { type: 'console' } ];
    const appenders = loggers.map(function (logger) {
      logger.category = enviroment;
      return logger;
    });
    log4js.configure({ appenders: appenders });

    this.enviroment = enviroment;
    this.logger = log4js.getLogger(this.enviroment);
    this.watchInterval = queue.watchInterval;
  }
}

function fromFile(tomlFile) {
  const env = tomlFile.replace(/.+\/(\w+)\.toml$/, '$1');
  const config = require(tomlFile);

  return new Configration(config || {}, env);
}
