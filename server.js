var path = require('path');
var server = require('./src/server');
var fromFile = require('./src/configration').fromFile;
var env = process.env.NODE_ENV || 'development';
var config = fromFile(path.resolve(process.cwd(), 'conf', env + '.toml'));

var watcher = new server.QueueWatcher({
  url: process.env.QUEUE_URL
});
var action = new server.QueueAction({
  url: process.env.QUEUE_URL
});

watcher.logger(config.logger)
  .action(action)
  .listen(config.watchInterval);

function shutdown(sig) {
  watcher.shutdown().then(function () {
    process.exit();
  }).catch(function (err) {
    process.exit(-1);
  });
}

process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
