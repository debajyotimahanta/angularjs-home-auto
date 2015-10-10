# Home Automation using AngularJS in realtime 
 IoT is the next big wave and we can see it all around us. In my talk, i will show how to build a simple home automation hub using Angular, realtime database and microcontrollers. I will go over some of the other frameworks we can leverage to do rapid protoyping.
 This repo is accompny to my meetup on Oct 27, 2015 hosted by [js-chi](http://www.meetup.com/js-chi/events/225146363/)
## Hardware

### Material List
 These are things that i have used from a hardware prespetvie
* [Arduino](https://www.sparkfun.com/products/12757)
* [Raspberry Pi](https://www.sparkfun.com/products/12994)
* [Breadboard](https://www.sparkfun.com/products/12002)
* [Temp Sensor](https://www.sparkfun.com/products/10988)
* [Wifi Module](https://www.sparkfun.com/products/11713)
* [Jumper Wires](https://www.sparkfun.com/products/9194)

### Setup

#### Raspberry Pie Setup
The Pi should be easy to setup, there are numberious tutiral out there depending on the version of linux. Now i think you can even have windows 10 running on it. But i used this tutorial to setup my pie

https://www.raspberrypi.org/help/quick-start-guide/

Once you have the pie setup i would advise you setup the wifi so that you can 

https://learn.sparkfun.com/tutorials/using-pcduinos-wifi-dongle-with-the-pi

Once you have this setup, you can ssh into the pie and make sure you have nodejs installed on the pie. The install should be like any normal linux system. Curl the package build it and you are all set.

#### Arduino Setup

The arudino you buy should come with instruction on how to setup it up. You can find more details about it in 

https://www.arduino.cc/en/Guide/HomePage

I will adivse you to go throug few tutorial and getting famiilar with a few basic programs like blink, digital/aganlog read, serial comminication before connecting it to Pie to diving into [Johnny Five](http://johnny-five.io/). I personally thing even though, Jhonny Five makes it very easy to play around with Arduino you need to know how it works at a basic level to trobuleshoot issues, when they come along.

Once you have arudino setup, follow the following steps to have Johhny Five and Arduino up and running

1. Setup Firmata
..1. Plug in your Arduino or Arduino compatible microcontroller via USB
..2. Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
..3. Click the "Upload" button.

If the upload was successful, the board is now prepared and you can close the Arduino IDE.

##### Breadboard for "Temperature - TMP36"
[images/temperature-tmp36.png](images/temperature-tmp36.png)


2. Host machine/Pie setup

In order for Pi or your laptop to talk to Arduino via Jhonny Five you need to have node and then do the following
#### Source Code:

``` bash
git clone git://github.com/rwaldron/johnny-five.git && cd johnny-five

npm install
```

#### npm package:

Install the module with:

```bash
npm install johnny-five
```
## Software
### Pie Software
Our Pi is running Johhny Five and running process which talks to arudino. The arduino publishes the data over serial port, which is connected to the pie. The pie listens to the data over serial port, parses it and publishes it to the [firebase](firebase.com) node.

```javascript
var five = require("johnny-five");

five.Board().on("ready", function() {
    var temperature = new five.Temperature({
          controller: "TMP36",
              pin: "A0"
                });

      temperature.on("data", function() {
            console.log(this.celsius + "°C", this.fahrenheit + "°F");
              });
});


```


### Ardunio Software
The arudino is running firemata code which lets it integrate with Pi, which is running the Johhny Five process.

### Mobile Setup
I used [Ionic](www.ionic.io) to develop the mobile application with (firebase)[firebase.com] as the backend. Firebase provides first citizen support for angular and its [three way binding](https://www.firebase.com/blog/2013-10-04-firebase-angular-data-binding.html) support works great to show realtime data very easily.

In our mobile app, we have used this [three way binding](https://www.firebase.com/blog/2013-10-04-firebase-angular-data-binding.html) to tie our temperature scope variable, which is shown in the screen. The firebase node for this temperature is feed in realtime from our IoT gateway. The IoT gateway is running Johnny Five service which talks to our arudino, which is constantly monitoring our temperature sensor and publishing it to the firebase node.

