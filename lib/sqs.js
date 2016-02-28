'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqs = new _awsSdk2.default.SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

exports.default = sqs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zcXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxNQUFNLElBQUksaUJBQUksR0FBSixDQUFRO0FBQ3RCLGVBQWEsUUFBUSxHQUFSLENBQVksY0FBWjtBQUNiLG1CQUFpQixRQUFRLEdBQVIsQ0FBWSxxQkFBWjtBQUNqQixVQUFRLFFBQVEsR0FBUixDQUFZLFVBQVo7Q0FIRSxDQUFOOztrQkFNUyIsImZpbGUiOiJzcXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQVdTIGZyb20gJ2F3cy1zZGsnO1xuXG5jb25zdCBzcXMgPSBuZXcgQVdTLlNRUyh7XG4gIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWSxcbiAgc2VjcmV0QWNjZXNzS2V5OiBwcm9jZXNzLmVudi5BV1NfU0VDUkVUX0FDQ0VTU19LRVksXG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTlxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNxcztcbiJdfQ==