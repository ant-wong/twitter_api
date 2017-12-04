const express = require('express');
const socket = require('socket.io');
const app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//TWITTER DEPENDENCY
// const getBearerToken = require('get-twitter-bearer-token')
const Twitter = require('twitter');
let client;

const twitter_consumer_key = 'ARNtqn4pZ9nvzQYqdE4wYOGRg'
const twitter_consumer_secret = 'FLTeWEt1ScNhxodAXWs9ZXNEQDnNpmeNdUmW6MKcTXRdeRmoPX'

client = new Twitter({
    consumer_key: 'ARNtqn4pZ9nvzQYqdE4wYOGRg',
    consumer_secret: 'FLTeWEt1ScNhxodAXWs9ZXNEQDnNpmeNdUmW6MKcTXRdeRmoPX',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAOuB3AAAAAAAKN2vI904MjVd5uq%2FEbcsTqXulbY%3DZT7X3l2qwuN8ruPr9dMSRXQ3lCimi74vEkT8KKSCYTt8UK2WOo'
});


//ROUTES

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});

app.get('/getTweet', (req, res) => {
    client.get('search/tweets', { q: 'vancouver OR love OR food OR sleep OR trump', count: 100}, function (error, tweets, response) {
        if (error) throw error;
        console.log(tweets);
        //console.log(response);  // Raw response object. 
        res.json(tweets)
    });
})

//SOCKETSERVER

//const io = require('socket.io').listen(app.listen(8080))

//io.origins(['localhost:3000']);

let io = socket();
io.listen(8080)
io.on('connection', function(socket) {
    console.log("connected")
    setInterval(() => {
        client.get('search/tweets', { q: 'vancouver OR love OR food OR sleep OR trump', count: 100 }, (error, tweets, response) => {
            if (error) throw error;
            console.log(tweets);
            //console.log(response);  // Raw response object. 
            socket.emit('tweets', tweets.statuses)
        });
    }, 5000)
})