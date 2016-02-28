var server = require('./server');
var conf = require('./configration');
var sqs = require('./sqs');

module.exports = {
  QueueAction: server.QueueAction,
  QueueWatcher: server.QueueWatcher,
  Configration: conf.Configration,
  fromFile: conf.fromFile,
  client: sqs
};
