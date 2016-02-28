'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = exports.fromFile = exports.Configration = exports.QueueWatcher = exports.QueueAction = undefined;

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _configration = require('./configration');

var _configration2 = _interopRequireDefault(_configration);

var _sqs = require('./sqs');

var _sqs2 = _interopRequireDefault(_sqs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueueAction = exports.QueueAction = _server2.default.QueueAction;
var QueueWatcher = exports.QueueWatcher = _server2.default.QueueWatcher;
var Configration = exports.Configration = _configration2.default.Configration;
var fromFile = exports.fromFile = _configration2.default.fromFile;
var client = exports.client = _sqs2.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJTyxJQUFNLG9DQUFjLGlCQUFPLFdBQVA7QUFDcEIsSUFBTSxzQ0FBZSxpQkFBTyxZQUFQO0FBQ3JCLElBQU0sc0NBQWUsdUJBQUssWUFBTDtBQUNyQixJQUFNLDhCQUFXLHVCQUFLLFFBQUw7QUFDakIsSUFBTSx1Q0FBTiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZXJ2ZXIgZnJvbSAnLi9zZXJ2ZXInO1xuaW1wb3J0IGNvbmYgZnJvbSAnLi9jb25maWdyYXRpb24nO1xuaW1wb3J0IHNxcyBmcm9tICcuL3Nxcyc7XG5cbmV4cG9ydCBjb25zdCBRdWV1ZUFjdGlvbiA9IHNlcnZlci5RdWV1ZUFjdGlvbjtcbmV4cG9ydCBjb25zdCBRdWV1ZVdhdGNoZXIgPSBzZXJ2ZXIuUXVldWVXYXRjaGVyO1xuZXhwb3J0IGNvbnN0IENvbmZpZ3JhdGlvbiA9IGNvbmYuQ29uZmlncmF0aW9uO1xuZXhwb3J0IGNvbnN0IGZyb21GaWxlID0gY29uZi5mcm9tRmlsZTtcbmV4cG9ydCBjb25zdCBjbGllbnQgPSBzcXM7XG4iXX0=