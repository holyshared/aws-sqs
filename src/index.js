var client = require('./client');

client().then(function (queue) {
  console.log(queue);

  queue.addMessage('aa').then(function (res) {
    console.log(res);
    process.exit();
  });
}).catch(function (err) {
  console.log(err);
});
