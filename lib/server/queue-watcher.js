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

var QueueWatcher = function () {
  function QueueWatcher(options) {
    _classCallCheck(this, QueueWatcher);

    this._watcherId = null;
    this._options = options;
    this._receiveOptions = {
      QueueUrl: this._options.url
    };
    this._watcher = this.receive.bind(this);
    this._receiver = this.onReceiveMessage.bind(this);
    this._logger = console;
  }

  _createClass(QueueWatcher, [{
    key: 'logger',
    value: function logger(_logger) {
      this._logger = _logger;
      return this;
    }
  }, {
    key: 'action',
    value: function action(_action) {
      this._action = _action;
      return this;
    }
  }, {
    key: 'receive',
    value: function receive() {
      _sqs2.default.receiveMessage(this._receiveOptions, this._receiver);
    }
  }, {
    key: 'onReceiveMessage',
    value: function onReceiveMessage(err, result) {
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
  }, {
    key: 'execute',
    value: function execute(messages) {
      var logger = this._logger;

      logger.info('start queue action');

      this._action.execute(messages).then(function (result) {
        logger.info(result);
      }).catch(function (err) {
        logger.error(err);
      });
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      this._logger.info('shutdown....');

      clearInterval(this._watcherId);
      this._watcher = null;
      this._receiver = null;

      return _bluebird.Promise.resolve();
    }
  }, {
    key: 'listen',
    value: function listen(delay) {
      this._logger.info('listen....');
      this._watcherId = setInterval(this._watcher, delay);
    }
  }]);

  return QueueWatcher;
}();

exports.default = QueueWatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvcXVldWUtd2F0Y2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHcUI7QUFDbkIsV0FEbUIsWUFDbkIsQ0FBWSxPQUFaLEVBQXFCOzBCQURGLGNBQ0U7O0FBQ25CLFNBQUssVUFBTCxHQUFrQixJQUFsQixDQURtQjtBQUVuQixTQUFLLFFBQUwsR0FBZ0IsT0FBaEIsQ0FGbUI7QUFHbkIsU0FBSyxlQUFMLEdBQXVCO0FBQ3JCLGdCQUFVLEtBQUssUUFBTCxDQUFjLEdBQWQ7S0FEWixDQUhtQjtBQU1uQixTQUFLLFFBQUwsR0FBZ0IsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFoQixDQU5tQjtBQU9uQixTQUFLLFNBQUwsR0FBaUIsS0FBSyxnQkFBTCxDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQUFqQixDQVBtQjtBQVFuQixTQUFLLE9BQUwsR0FBZSxPQUFmLENBUm1CO0dBQXJCOztlQURtQjs7MkJBV1osU0FBUTtBQUNiLFdBQUssT0FBTCxHQUFlLE9BQWYsQ0FEYTtBQUViLGFBQU8sSUFBUCxDQUZhOzs7OzJCQUlSLFNBQVE7QUFDYixXQUFLLE9BQUwsR0FBZSxPQUFmLENBRGE7QUFFYixhQUFPLElBQVAsQ0FGYTs7Ozs4QkFJTDtBQUNSLG9CQUFJLGNBQUosQ0FBbUIsS0FBSyxlQUFMLEVBQXNCLEtBQUssU0FBTCxDQUF6QyxDQURROzs7O3FDQUdPLEtBQUssUUFBUTtBQUM1QixVQUFJLEdBQUosRUFBUztBQUNQLGFBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsR0FBbkIsRUFETztBQUVQLGVBRk87T0FBVDs7QUFLQSxVQUFJLENBQUMsT0FBTyxRQUFQLEVBQWlCO0FBQ3BCLGFBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsWUFBbEIsRUFEb0I7QUFFcEIsZUFGb0I7T0FBdEI7O0FBS0EsV0FBSyxPQUFMLENBQWEsT0FBTyxRQUFQLENBQWIsQ0FYNEI7Ozs7NEJBY3RCLFVBQVU7QUFDaEIsVUFBTSxTQUFTLEtBQUssT0FBTCxDQURDOztBQUdoQixhQUFPLElBQVAsQ0FBWSxvQkFBWixFQUhnQjs7QUFLaEIsV0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixRQUFyQixFQUErQixJQUEvQixDQUFvQyxVQUFVLE1BQVYsRUFBa0I7QUFDcEQsZUFBTyxJQUFQLENBQVksTUFBWixFQURvRDtPQUFsQixDQUFwQyxDQUVHLEtBRkgsQ0FFUyxVQUFVLEdBQVYsRUFBZTtBQUN0QixlQUFPLEtBQVAsQ0FBYSxHQUFiLEVBRHNCO09BQWYsQ0FGVCxDQUxnQjs7OzsrQkFZUDtBQUNULFdBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsY0FBbEIsRUFEUzs7QUFHVCxvQkFBYyxLQUFLLFVBQUwsQ0FBZCxDQUhTO0FBSVQsV0FBSyxRQUFMLEdBQWdCLElBQWhCLENBSlM7QUFLVCxXQUFLLFNBQUwsR0FBaUIsSUFBakIsQ0FMUzs7QUFPVCxhQUFPLGtCQUFRLE9BQVIsRUFBUCxDQVBTOzs7OzJCQVVKLE9BQU87QUFDWixXQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLFlBQWxCLEVBRFk7QUFFWixXQUFLLFVBQUwsR0FBa0IsWUFBWSxLQUFLLFFBQUwsRUFBZSxLQUEzQixDQUFsQixDQUZZOzs7O1NBMURLIiwiZmlsZSI6InF1ZXVlLXdhdGNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3FzIGZyb20gJy4uL3Nxcyc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWV1ZVdhdGNoZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5fd2F0Y2hlcklkID0gbnVsbDtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLl9yZWNlaXZlT3B0aW9ucyA9IHtcbiAgICAgIFF1ZXVlVXJsOiB0aGlzLl9vcHRpb25zLnVybFxuICAgIH07XG4gICAgdGhpcy5fd2F0Y2hlciA9IHRoaXMucmVjZWl2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX3JlY2VpdmVyID0gdGhpcy5vblJlY2VpdmVNZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbG9nZ2VyID0gY29uc29sZTtcbiAgfVxuICBsb2dnZXIobG9nZ2VyKSB7XG4gICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFjdGlvbihhY3Rpb24pIHtcbiAgICB0aGlzLl9hY3Rpb24gPSBhY3Rpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVjZWl2ZSgpIHtcbiAgICBzcXMucmVjZWl2ZU1lc3NhZ2UodGhpcy5fcmVjZWl2ZU9wdGlvbnMsIHRoaXMuX3JlY2VpdmVyKTtcbiAgfVxuICBvblJlY2VpdmVNZXNzYWdlKGVyciwgcmVzdWx0KSB7XG4gICAgaWYgKGVycikge1xuICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFyZXN1bHQuTWVzc2FnZXMpIHtcbiAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdubyBtZXNzYWdlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5leGVjdXRlKHJlc3VsdC5NZXNzYWdlcyk7XG4gIH1cblxuICBleGVjdXRlKG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgbG9nZ2VyID0gdGhpcy5fbG9nZ2VyO1xuXG4gICAgbG9nZ2VyLmluZm8oJ3N0YXJ0IHF1ZXVlIGFjdGlvbicpO1xuXG4gICAgdGhpcy5fYWN0aW9uLmV4ZWN1dGUobWVzc2FnZXMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgbG9nZ2VyLmluZm8ocmVzdWx0KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNodXRkb3duKCkge1xuICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdzaHV0ZG93bi4uLi4nKTtcblxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fd2F0Y2hlcklkKTtcbiAgICB0aGlzLl93YXRjaGVyID0gbnVsbDtcbiAgICB0aGlzLl9yZWNlaXZlciA9IG51bGw7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICBsaXN0ZW4oZGVsYXkpIHtcbiAgICB0aGlzLl9sb2dnZXIuaW5mbygnbGlzdGVuLi4uLicpO1xuICAgIHRoaXMuX3dhdGNoZXJJZCA9IHNldEludGVydmFsKHRoaXMuX3dhdGNoZXIsIGRlbGF5KTtcbiAgfVxufVxuIl19