var five = require("johnny-five");
var Send = require('./modules/send.js');
var send = new Send(); 
var freq = 5;
var delta = 1;

var temp0 = 0;
var temp1 = 0;

five.Board().on("ready", function() {
    var temperature = new five.Temperature({
        controller: "TMP36",
        pin: "A0"
    });

    temperature.on("data", function() {
        temp1 = this.fahrenheit;
        if (temp1 - temp0 > delta || temp0 - temp1 > delta) {
            console.log(this.celsius + "°C", this.fahrenheit + "°F");
            sendData(this.fahrenheit);
            temp0 = temp1;
        }
    });

});

function sendData(temp) {
  send.updateTemp(temp);
}
