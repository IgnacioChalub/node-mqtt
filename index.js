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

var lastMessage = "";

client.on('message', function (topic, message) {
    // called each time a message is received
    lastMessage = message.toString();
    console.log('Received message:', topic, message.toString());
    try {
        let data = JSON.parse(lastMessage);
        console.log(data)
        console.log(data.humedad)
        console.log(data.temperaturaCelsius)
        console.log(data.temperaturaFarenheit)
    } catch (e) {
        console.log(e.message)
    }
    //publish message to microcontroller
    client.publish('environment-data-micro', 'something')
});

// subscribe to topic 'my/test/topic'
client.subscribe('environment-data-server');

// publish message 'Hello' to topic 'my/test/topic'
// client.publish('environment-data', 'Hello');


const express = require('express')
const app = express()
const port =3000 

app.get('/', (req, res) => {
  res.send(lastMessage)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
