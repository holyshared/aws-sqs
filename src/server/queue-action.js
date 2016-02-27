var sqs = require('../sqs');
var Promise = require('bluebird');

function QueueAction(options) {
  this._options = options;
  this._succeedMessages = [];
  this._failedReasons = [];
}

QueueAction.prototype.action = function(message) {
  return Promise.resolve();
}

QueueAction.prototype.doAction = function(message) {
  var self = this;

  return function () {
    return Promise.bind(self).then(function () {
      return this.action(message);
    }).then(function (result) {
      return this.finish(message);
    }).then(function (result) {
      this._succeedMessages.push(result);
    }).catch(function (err) {
      this._failedReasons.push(err);
    });
  };
}

QueueAction.prototype.finish = function(message) {
  var params = {
    QueueUrl: this._options.url,
    ReceiptHandle: message.ReceiptHandle
  };

  return new Promise(function (resolve, reject) {
    sql.deleteMessage(params, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

QueueAction.prototype.execute = function (messages) {
  var chain = Promise.bind(this);

  messages.forEach(function (message) {
    chain = chain.then(this.doAction(message));
  });

  return chain.then(function () {
    return {
      succeedMessages: this._succeedMessages,
      failedReasons: this._failedReasons
    }
  });
}

module.exports = QueueAction;
