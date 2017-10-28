const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

//set up static files
app.use(express.static('public'));

//connect to mongodb
var promise = mongoose.connect('mongodb://localhost/diarygo', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(process.env.port || 4000, () => {
    console.log('now listening for requests');
});