var mqtt = require('mqtt')
require('dotenv').config()

var options = {
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    const obj = JSON.parse(message.toString());
    console.log('Received message:', topic);
    console.log(obj)
});

// subscribe to topic 'my/test/topic'
client.subscribe('environment-data');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');