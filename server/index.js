// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const activityRouter = require('./routes/activities');


const app = express();


// MIDDLEWARE
app.use(bodyParser.json());                 // using bodyParser to parse JSON bodies into JS objects
app.use(cors());                            // enabling CORS for all requests
app.use(morgan('combined'));        // adding morgan to log HTTP requests


// ROUTING
app.get('/', function (req, res) {
  res.send("Hello, I'm the server");
})

app.use("/activities", activityRouter)


// STARTING THE SERVER
app.listen(3000, () => {
  console.log('listening on port 3000');
});