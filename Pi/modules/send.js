var Send = function() {};
var Firebase = require('firebase');
var ref  = new Firebase('https://debatest.firebaseio.com/');

Send.prototype.updateTemp = function(temp) {
    console.log('Temp will be sent to firebase ' + temp);
    ref.child('temp').set(temp);
};

Send.prototype.watchValue = function(cb) {
    ref.child('switch').on('value', function(snapshot) {
      
        if(snapshot.val()>0){
          cb(true);
        }else{
          cb(false);
        }
    });
};



module.exports = Send;
