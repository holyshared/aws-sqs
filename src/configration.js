require('toml-require').install();

var path = require('path');
var log4js = require('log4js');

function Configration(config, env) {
  var enviroment = env || 'development';
  var queue = config.queue || { watchInterval: 5000 };
  var loggers = config.loggers || [ { type: 'console' } ];
  var appenders = loggers.map(function (logger) {
    logger.category = enviroment;
    return logger;
  });
  log4js.configure({ appenders: appenders });

  this.enviroment = enviroment;
  this.logger = log4js.getLogger(this.enviroment);
  this.watchInterval = queue.watchInterval;
}

module.exports.Configration = Configration;
module.exports.fromFile = function (tomlPath) {
  var env = process.env.NODE_ENV || 'development';
  var absPath = path.resolve(process.cwd(), tomlPath);
  var config = require(absPath);

  return new Configration(config[env] || {}, env);
}
