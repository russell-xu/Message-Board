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

client.get("messages", function (err, reply) {
    if (!reply) {
        client.set("messages", "[]")
    }
});

client.get("serial_number", function (err, reply) {
    if (!reply) {
        client.set("serial_number", 0)
    }
});

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

const addMessage = async (req, res) => {
    try {
        console.log('Add Data...');

        const dateTime = () => {
            const today = new Date();
            const date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
            const time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
            const dateTime = date + " " + time;
            return dateTime;
        };

        client.get("messages", function (err, data) {
            client.get("serial_number", function (err, reply) {
                const idNumber = parseInt(reply)
                client.set("serial_number", idNumber + 1)
                req.body.id = idNumber;
                req.body.time = dateTime();
                let messages = JSON.parse(data);
                messages.push(req.body);
                client.set("messages", JSON.stringify(messages));
                res.send(messages);
                console.log(req.body);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

const updateMessage = async (req, res) => {
    try {
        console.log('Update Data...');
        console.log(req.body);
        client.get("messages", function (err, data) {
            let messages = JSON.parse(data);
            const found = messages.find(el => el.id == req.body.id);
            const i = messages.indexOf(found)
            messages[i].name = req.body.name;
            messages[i].message = req.body.message;
            client.set("messages", JSON.stringify(messages));
            res.send(messages);
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

const deleteMessage = async (req, res) => {
    try {
        console.log('Delete Data...');
        console.log(req.body);
        client.get("messages", function (err, data) {
            let messages = JSON.parse(data);
            const found = messages.find(el => el.id == req.body.id);
            messages.splice(messages.indexOf(found), 1);
            client.set("messages", JSON.stringify(messages));
            res.send(messages);
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

app.get('/getMessages', getMessages);
app.post('/addMessage', addMessage);
app.post('/updateMessage', updateMessage);
app.post('/deleteMessage', deleteMessage);

app.listen(5000, () => {
    console.log(`App listening on port ${PORT}`);
})