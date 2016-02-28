import server from './server';
import conf from './configration';
import sqs from './sqs';

export const QueueAction = server.QueueAction;
export const QueueWatcher = server.QueueWatcher;
export const Configration = conf.Configration;
export const fromFile = conf.fromFile;
export const client = sqs;
