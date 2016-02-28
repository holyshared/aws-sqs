'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sqs = require('../sqs');

var _sqs2 = _interopRequireDefault(_sqs);

var _bluebird = require('bluebird');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueueAction = function () {
  function QueueAction(options) {
    _classCallCheck(this, QueueAction);

    this._options = options;
    this._succeedMessages = [];
    this._failedReasons = [];
  }

  _createClass(QueueAction, [{
    key: 'action',
    value: function action(message) {
      return _bluebird.Promise.resolve();
    }
  }, {
    key: 'doAction',
    value: function doAction(message) {
      var self = this;

      return function () {
        return _bluebird.Promise.bind(self).then(function () {
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
  }, {
    key: 'finish',
    value: function finish(message) {
      var params = {
        QueueUrl: this._options.url,
        ReceiptHandle: message.ReceiptHandle
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _sqs2.default.deleteMessage(params, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }
  }, {
    key: 'execute',
    value: function execute(messages) {
      var chain = _bluebird.Promise.bind(this);

      messages.forEach(function (message) {
        chain = chain.then(this.doAction(message));
      }, this);

      return chain.then(function () {
        return {
          succeedMessages: this._succeedMessages,
          failedReasons: this._failedReasons
        };
      });
    }
  }]);

  return QueueAction;
}();

/*
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
*/
/*
QueueAction.prototype.finish = function(message) {
  var params = {
    QueueUrl: this._options.url,
    ReceiptHandle: message.ReceiptHandle
  };

  return new Promise(function (resolve, reject) {
    sqs.deleteMessage(params, function (err, result) {
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
  }, this);

  return chain.then(function () {
    return {
      succeedMessages: this._succeedMessages,
      failedReasons: this._failedReasons
    }
  });
}

module.exports = QueueAction;
*/


exports.default = QueueAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvcXVldWUtYWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdxQjtBQUNuQixXQURtQixXQUNuQixDQUFZLE9BQVosRUFBcUI7MEJBREYsYUFDRTs7QUFDbkIsU0FBSyxRQUFMLEdBQWdCLE9BQWhCLENBRG1CO0FBRW5CLFNBQUssZ0JBQUwsR0FBd0IsRUFBeEIsQ0FGbUI7QUFHbkIsU0FBSyxjQUFMLEdBQXNCLEVBQXRCLENBSG1CO0dBQXJCOztlQURtQjs7MkJBTVosU0FBUztBQUNkLGFBQU8sa0JBQVEsT0FBUixFQUFQLENBRGM7Ozs7NkJBR1AsU0FBUztBQUNoQixVQUFNLE9BQU8sSUFBUCxDQURVOztBQUdoQixhQUFPLFlBQVk7QUFDakIsZUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixZQUFZO0FBQ3pDLGlCQUFPLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBUCxDQUR5QztTQUFaLENBQXhCLENBRUosSUFGSSxDQUVDLFVBQVUsTUFBVixFQUFrQjtBQUN4QixpQkFBTyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQVAsQ0FEd0I7U0FBbEIsQ0FGRCxDQUlKLElBSkksQ0FJQyxVQUFVLE1BQVYsRUFBa0I7QUFDeEIsZUFBSyxnQkFBTCxDQUFzQixJQUF0QixDQUEyQixNQUEzQixFQUR3QjtTQUFsQixDQUpELENBTUosS0FOSSxDQU1FLFVBQVUsR0FBVixFQUFlO0FBQ3RCLGVBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixHQUF6QixFQURzQjtTQUFmLENBTlQsQ0FEaUI7T0FBWixDQUhTOzs7OzJCQWVYLFNBQVM7QUFDZCxVQUFNLFNBQVM7QUFDYixrQkFBVSxLQUFLLFFBQUwsQ0FBYyxHQUFkO0FBQ1YsdUJBQWUsUUFBUSxhQUFSO09BRlgsQ0FEUTs7QUFNZCxhQUFPLHNCQUFZLFVBQVUsT0FBVixFQUFtQixNQUFuQixFQUEyQjtBQUM1QyxzQkFBSSxhQUFKLENBQWtCLE1BQWxCLEVBQTBCLFVBQVUsR0FBVixFQUFlLE1BQWYsRUFBdUI7QUFDL0MsY0FBSSxHQUFKLEVBQVM7QUFDUCxtQkFBTyxPQUFPLEdBQVAsQ0FBUCxDQURPO1dBQVQ7QUFHQSxrQkFBUSxNQUFSLEVBSitDO1NBQXZCLENBQTFCLENBRDRDO09BQTNCLENBQW5CLENBTmM7Ozs7NEJBZVIsVUFBVTtBQUNoQixVQUFJLFFBQVEsa0JBQVEsSUFBUixDQUFhLElBQWIsQ0FBUixDQURZOztBQUdoQixlQUFTLE9BQVQsQ0FBaUIsVUFBVSxPQUFWLEVBQW1CO0FBQ2xDLGdCQUFRLE1BQU0sSUFBTixDQUFXLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBWCxDQUFSLENBRGtDO09BQW5CLEVBRWQsSUFGSCxFQUhnQjs7QUFPaEIsYUFBTyxNQUFNLElBQU4sQ0FBVyxZQUFZO0FBQzVCLGVBQU87QUFDTCwyQkFBaUIsS0FBSyxnQkFBTDtBQUNqQix5QkFBZSxLQUFLLGNBQUw7U0FGakIsQ0FENEI7T0FBWixDQUFsQixDQVBnQjs7OztTQXZDQyIsImZpbGUiOiJxdWV1ZS1hY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3FzIGZyb20gJy4uL3Nxcyc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWV1ZUFjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLl9zdWNjZWVkTWVzc2FnZXMgPSBbXTtcbiAgICB0aGlzLl9mYWlsZWRSZWFzb25zID0gW107XG4gIH1cbiAgYWN0aW9uKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgZG9BY3Rpb24obWVzc2FnZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmJpbmQoc2VsZikudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbihtZXNzYWdlKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5pc2gobWVzc2FnZSk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5fc3VjY2VlZE1lc3NhZ2VzLnB1c2gocmVzdWx0KTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5fZmFpbGVkUmVhc29ucy5wdXNoKGVycik7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIGZpbmlzaChtZXNzYWdlKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgUXVldWVVcmw6IHRoaXMuX29wdGlvbnMudXJsLFxuICAgICAgUmVjZWlwdEhhbmRsZTogbWVzc2FnZS5SZWNlaXB0SGFuZGxlXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBzcXMuZGVsZXRlTWVzc2FnZShwYXJhbXMsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGV4ZWN1dGUobWVzc2FnZXMpIHtcbiAgICBsZXQgY2hhaW4gPSBQcm9taXNlLmJpbmQodGhpcyk7XG5cbiAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBjaGFpbiA9IGNoYWluLnRoZW4odGhpcy5kb0FjdGlvbihtZXNzYWdlKSk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gY2hhaW4udGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZWVkTWVzc2FnZXM6IHRoaXMuX3N1Y2NlZWRNZXNzYWdlcyxcbiAgICAgICAgZmFpbGVkUmVhc29uczogdGhpcy5fZmFpbGVkUmVhc29uc1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qXG5mdW5jdGlvbiBRdWV1ZUFjdGlvbihvcHRpb25zKSB7XG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLl9zdWNjZWVkTWVzc2FnZXMgPSBbXTtcbiAgdGhpcy5fZmFpbGVkUmVhc29ucyA9IFtdO1xufVxuXG5RdWV1ZUFjdGlvbi5wcm90b3R5cGUuYWN0aW9uID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59XG5cblF1ZXVlQWN0aW9uLnByb3RvdHlwZS5kb0FjdGlvbiA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYmluZChzZWxmKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdGlvbihtZXNzYWdlKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbmlzaChtZXNzYWdlKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHRoaXMuX3N1Y2NlZWRNZXNzYWdlcy5wdXNoKHJlc3VsdCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgdGhpcy5fZmFpbGVkUmVhc29ucy5wdXNoKGVycik7XG4gICAgfSk7XG4gIH07XG59XG4qL1xuLypcblF1ZXVlQWN0aW9uLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gIHZhciBwYXJhbXMgPSB7XG4gICAgUXVldWVVcmw6IHRoaXMuX29wdGlvbnMudXJsLFxuICAgIFJlY2VpcHRIYW5kbGU6IG1lc3NhZ2UuUmVjZWlwdEhhbmRsZVxuICB9O1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgc3FzLmRlbGV0ZU1lc3NhZ2UocGFyYW1zLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuUXVldWVBY3Rpb24ucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAobWVzc2FnZXMpIHtcbiAgdmFyIGNoYWluID0gUHJvbWlzZS5iaW5kKHRoaXMpO1xuXG4gIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBjaGFpbiA9IGNoYWluLnRoZW4odGhpcy5kb0FjdGlvbihtZXNzYWdlKSk7XG4gIH0sIHRoaXMpO1xuXG4gIHJldHVybiBjaGFpbi50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VlZE1lc3NhZ2VzOiB0aGlzLl9zdWNjZWVkTWVzc2FnZXMsXG4gICAgICBmYWlsZWRSZWFzb25zOiB0aGlzLl9mYWlsZWRSZWFzb25zXG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBRdWV1ZUFjdGlvbjtcbiovXG4iXX0=