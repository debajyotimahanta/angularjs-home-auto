var Send = function(){};
var Firebase = require('firebase');
var tempRef = new Firebase('https://debatest.firebaseio.com/temperature');

Send.prototype.updateTemp = function(temp) {
  console.log('Temp will be sent to firebase '+temp);
  tempRef.set(temp);
};


module.exports = Send;

