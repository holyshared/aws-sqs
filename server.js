var server = require('./src/server');
var watcher = new server.QueueWatcher({
  url: process.env.QUEUE_URL
}):
var action = new server.QueueAction({
  url: process.env.QUEUE_URL
}):
watcher.action(action).listen(5000);

function shutdown(sig) {
  watcher.shutdown().then(function () {
    process.exit();
  }).catch(function (err) {
    process.exit(-1);
  });
}

process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
