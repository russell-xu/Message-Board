const express = require("express");
const redis = require("redis");
const cors = require("cors");
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const getMessages = async (req, res) => {
    try {
        console.log('Get Data...');
        client.get("messages", function (err, reply) {
            let messages = JSON.parse(reply);
            res.send(messages);
            console.log(messages);
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

const postMessage = async (req, res) => {
    try {
        console.log('Post Data...');
        client.get("messages", function (err, data) {
            let messages = JSON.parse(data);
            messages.push(req.body);
            client.set("messages", JSON.stringify(messages));
            res.send(messages);
            console.log(req.body);
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

app.get('/getMessages', getMessages);
app.post('/postMessage', postMessage);

app.listen(5000, () => {
    console.log(`App listening on port ${PORT}`);
})