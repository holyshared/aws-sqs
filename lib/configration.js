'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tomlRequire = require('toml-require');

var _tomlRequire2 = _interopRequireDefault(_tomlRequire);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_tomlRequire2.default.install();

exports.default = {
  Configration: Configration,
  fromFile: fromFile
};

var Configration = function Configration(config, env) {
  _classCallCheck(this, Configration);

  var enviroment = env || 'development';
  var queue = config.queue || { watchInterval: 5000 };
  var loggers = config.loggers || [{ type: 'console' }];
  var appenders = loggers.map(function (logger) {
    logger.category = enviroment;
    return logger;
  });
  _log4js2.default.configure({ appenders: appenders });

  this.enviroment = enviroment;
  this.logger = _log4js2.default.getLogger(this.enviroment);
  this.watchInterval = queue.watchInterval;
};

function fromFile(tomlFile) {
  var env = tomlFile.replace(/.+\/(\w+)\.toml$/, '$1');
  var config = require(tomlFile);

  return new Configration(config || {}, env);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWdyYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHNCQUFPLE9BQVA7O2tCQUtlO0FBQ2IsZ0JBQWMsWUFBZDtBQUNBLFlBQVUsUUFBVjs7O0lBR0ksZUFDSixTQURJLFlBQ0osQ0FBWSxNQUFaLEVBQW9CLEdBQXBCLEVBQXlCO3dCQURyQixjQUNxQjs7QUFDdkIsTUFBTSxhQUFhLE9BQU8sYUFBUCxDQURJO0FBRXZCLE1BQU0sUUFBUSxPQUFPLEtBQVAsSUFBZ0IsRUFBRSxlQUFlLElBQWYsRUFBbEIsQ0FGUztBQUd2QixNQUFNLFVBQVUsT0FBTyxPQUFQLElBQWtCLENBQUUsRUFBRSxNQUFNLFNBQU4sRUFBSixDQUFsQixDQUhPO0FBSXZCLE1BQU0sWUFBWSxRQUFRLEdBQVIsQ0FBWSxVQUFVLE1BQVYsRUFBa0I7QUFDOUMsV0FBTyxRQUFQLEdBQWtCLFVBQWxCLENBRDhDO0FBRTlDLFdBQU8sTUFBUCxDQUY4QztHQUFsQixDQUF4QixDQUppQjtBQVF2QixtQkFBTyxTQUFQLENBQWlCLEVBQUUsV0FBVyxTQUFYLEVBQW5CLEVBUnVCOztBQVV2QixPQUFLLFVBQUwsR0FBa0IsVUFBbEIsQ0FWdUI7QUFXdkIsT0FBSyxNQUFMLEdBQWMsaUJBQU8sU0FBUCxDQUFpQixLQUFLLFVBQUwsQ0FBL0IsQ0FYdUI7QUFZdkIsT0FBSyxhQUFMLEdBQXFCLE1BQU0sYUFBTixDQVpFO0NBQXpCOztBQWdCRixTQUFTLFFBQVQsQ0FBa0IsUUFBbEIsRUFBNEI7QUFDMUIsTUFBTSxNQUFNLFNBQVMsT0FBVCxDQUFpQixrQkFBakIsRUFBcUMsSUFBckMsQ0FBTixDQURvQjtBQUUxQixNQUFNLFNBQVMsUUFBUSxRQUFSLENBQVQsQ0FGb0I7O0FBSTFCLFNBQU8sSUFBSSxZQUFKLENBQWlCLFVBQVUsRUFBVixFQUFjLEdBQS9CLENBQVAsQ0FKMEI7Q0FBNUIiLCJmaWxlIjoiY29uZmlncmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvYWRlciBmcm9tICd0b21sLXJlcXVpcmUnO1xuXG5sb2FkZXIuaW5zdGFsbCgpO1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBsb2c0anMgZnJvbSAnbG9nNGpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBDb25maWdyYXRpb246IENvbmZpZ3JhdGlvbixcbiAgZnJvbUZpbGU6IGZyb21GaWxlXG59XG5cbmNsYXNzIENvbmZpZ3JhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgZW52KSB7XG4gICAgY29uc3QgZW52aXJvbWVudCA9IGVudiB8fCAnZGV2ZWxvcG1lbnQnO1xuICAgIGNvbnN0IHF1ZXVlID0gY29uZmlnLnF1ZXVlIHx8IHsgd2F0Y2hJbnRlcnZhbDogNTAwMCB9O1xuICAgIGNvbnN0IGxvZ2dlcnMgPSBjb25maWcubG9nZ2VycyB8fCBbIHsgdHlwZTogJ2NvbnNvbGUnIH0gXTtcbiAgICBjb25zdCBhcHBlbmRlcnMgPSBsb2dnZXJzLm1hcChmdW5jdGlvbiAobG9nZ2VyKSB7XG4gICAgICBsb2dnZXIuY2F0ZWdvcnkgPSBlbnZpcm9tZW50O1xuICAgICAgcmV0dXJuIGxvZ2dlcjtcbiAgICB9KTtcbiAgICBsb2c0anMuY29uZmlndXJlKHsgYXBwZW5kZXJzOiBhcHBlbmRlcnMgfSk7XG5cbiAgICB0aGlzLmVudmlyb21lbnQgPSBlbnZpcm9tZW50O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nNGpzLmdldExvZ2dlcih0aGlzLmVudmlyb21lbnQpO1xuICAgIHRoaXMud2F0Y2hJbnRlcnZhbCA9IHF1ZXVlLndhdGNoSW50ZXJ2YWw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZnJvbUZpbGUodG9tbEZpbGUpIHtcbiAgY29uc3QgZW52ID0gdG9tbEZpbGUucmVwbGFjZSgvLitcXC8oXFx3KylcXC50b21sJC8sICckMScpO1xuICBjb25zdCBjb25maWcgPSByZXF1aXJlKHRvbWxGaWxlKTtcblxuICByZXR1cm4gbmV3IENvbmZpZ3JhdGlvbihjb25maWcgfHwge30sIGVudik7XG59XG4iXX0=