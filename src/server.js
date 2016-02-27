var server = require('./server');
var watcher = new server.QueueWatcher({
  url: process.env.QUEUE_URL
}):
var action = new server.QueueAction({
  url: process.env.QUEUE_URL
}):
watcher.action(action).listen(5000);
