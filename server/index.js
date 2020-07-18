// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });
});

// TEMP stuff
const a = require('./routes/missions');
const api = require('./routes/api')


// MIDDLEWARE
app.use(bodyParser.json());                  // using bodyParser to parse JSON bodies into js objects
app.use(cors());                             // enabling CORS for all requests
app.use(morgan('combined'));          // adding morgan to log HTTP requests
app.use(fileUpload({debug: true}));

app.use(express.static('public'));
app.use(express.static('data/resources'))

app.use('/player', express.static('../player'));
app.use('/author', express.static('../author'));
app.use('/supervisor', express.static('../supervisor'));
app.use('/common', express.static('../common'));

app.use(express.static(path.join(__dirname, 'node_modules')));

// ROUTING
app.get('/', function (req, res) {
  res.send("Hello, I'm the server");
})


app.use("/missions", a)
app.use("/api", api)

// STARTING THE SERVER
server.listen(8000, () => {
  console.log('listening on port 3000');
});