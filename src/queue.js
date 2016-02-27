var sqs = require('./sqs');

function Queue(queue) {
  this._queue = queue;
}

Queue.prototype.addMessage = function (body) {
  var params = {
    QueueUrl: this._queue.QueueUrl,
    MessageBody: body,
    MessageAttributes: {
      someKey: {
        DataType: 'String',
        StringValue: 'STRING_VALUE'
      }
    }
  };

  return new Promise(function (resolve, reject) {
    sqs.sendMessage(params, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

Queue.create = function () {
  var params = {
    QueueName: "MyQueue",
    Attributes: {
      DelaySeconds: 1000
    }
  };

  return new Promise(function (resolve, reject) {
    sqs.createQueue(params, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(new Queue(result));
    });
  });
}

module.exports = Queue;
