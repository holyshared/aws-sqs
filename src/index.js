var messenger = require('./messenger');

messenger('aa').then(function (res) {
  console.log(res);
  process.exit();
}).catch(function (err) {
  console.log(err);
});
