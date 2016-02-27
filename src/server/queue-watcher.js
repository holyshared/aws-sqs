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
    console.log(err);
    return;
  }

  if (!result.Messages) {
    console.log('no message');
    return;
  }

  this.execute(result.Messages);
}

QueueWatcher.prototype.execute = function (messages) {
  this._action.execute(messages).then(function (result) {
    console.log(result);
  }).catch(function (err) {
    console.log(err.stack);
  });
}

QueueWatcher.prototype.shutdown = function () {
  clearInterval(this._watcherId);
  this._watcher = null;
  this._receiver = null;

  return Promise.resolve();
}

QueueWatcher.prototype.listen = function (delay) {
  this._watcherId = setInterval(this._watcher, delay);
}

module.exports = QueueWatcher;
