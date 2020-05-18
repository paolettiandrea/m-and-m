// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// TEMP stuff
const a = require('./routes/missions');
const api = require('./routes/api')


const app = express();


// MIDDLEWARE
app.use(bodyParser.json());                  // using bodyParser to parse JSON bodies into JS objects
app.use(cors());                             // enabling CORS for all requests
app.use(morgan('combined'));          // adding morgan to log HTTP requests

app.use(express.static('public'));
app.use('/player', express.static('../player'));
app.use('/author', express.static('../author'));

// ROUTING
app.get('/', function (req, res) {
  res.send("Hello, I'm the server");
})


app.use("/missions", a)
app.use("/api", api)


// STARTING THE SERVER
app.listen(3000, () => {
  console.log('listening on port 3000');
});