var sqs = require('../sqs');
var Promise = require('bluebird');

function QueueWatcher(options) {
  this._watcherId = null;
  this._options = options;
  this._receiveOptions = {
    QueueUrl: this._options.url
  };
  this._watcher = this.receive.bind(this);
  this._receiver = this.onReceiveMessage.bind(this);
  this._logger = console;
}

QueueWatcher.prototype.logger = function (logger) {
  this._logger = logger;
  return this;
}

QueueWatcher.prototype.action = function (action) {
  this._action = action;
  return this;
}

QueueWatcher.prototype.receive = function () {
  sqs.receiveMessage(this._receiveOptions, this._receiver);
}

QueueWatcher.prototype.onReceiveMessage = function (err, result) {
  if (err) {
    this._logger.error(err);
    return;
  }

  if (!result.Messages) {
    this._logger.info('no message');
    return;
  }

  this.execute(result.Messages);
}

QueueWatcher.prototype.execute = function (messages) {
  var logger = this._logger;

  logger.info('start queue action');

  this._action.execute(messages).then(function (result) {
    logger.info(result);
  }).catch(function (err) {
    logger.error(err);
  });
}

QueueWatcher.prototype.shutdown = function () {
  this._logger.info('shutdown....');

  clearInterval(this._watcherId);
  this._watcher = null;
  this._receiver = null;

  return Promise.resolve();
}

QueueWatcher.prototype.listen = function (delay) {
  this._logger.info('listen....');
  this._watcherId = setInterval(this._watcher, delay);
}

module.exports = QueueWatcher;
