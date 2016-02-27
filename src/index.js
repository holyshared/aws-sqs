var Queue = require('./queue');

Queue.create().then(function (queue) {
  queue.addMessage('aa').then(function (res) {
    console.log(res);
    process.exit();
  });
});
