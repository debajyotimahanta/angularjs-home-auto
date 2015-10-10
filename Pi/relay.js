var five = require("johnny-five");
var board = new five.Board();

var Send = require('./modules/send.js');
var send = new Send();


board.on("ready", function() {

    var led = new five.Led(13);

      // "blink" the led in 500ms on-off phase periods
      send.watchValue(function(value){
        console.log('got response '+value);
        if(value){
          led.on();
        }else{
          led.off();
        
        }
      
      });
});
