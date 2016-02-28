import sqs from '../sqs';
import { Promise } from 'bluebird';

export default class QueueWatcher {
  constructor(options) {
    this._watcherId = null;
    this._options = options;
    this._receiveOptions = {
      QueueUrl: this._options.url
    };
    this._watcher = this.receive.bind(this);
    this._receiver = this.onReceiveMessage.bind(this);
    this._logger = console;
  }
  logger(logger) {
    this._logger = logger;
    return this;
  }
  action(action) {
    this._action = action;
    return this;
  }
  receive() {
    sqs.receiveMessage(this._receiveOptions, this._receiver);
  }
  onReceiveMessage(err, result) {
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

  execute(messages) {
    const logger = this._logger;

    logger.info('start queue action');

    this._action.execute(messages).then(function (result) {
      logger.info(result);
    }).catch(function (err) {
      logger.error(err);
    });
  }

  shutdown() {
    this._logger.info('shutdown....');

    clearInterval(this._watcherId);
    this._watcher = null;
    this._receiver = null;

    return Promise.resolve();
  }

  listen(delay) {
    this._logger.info('listen....');
    this._watcherId = setInterval(this._watcher, delay);
  }
}
