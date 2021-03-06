// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');


const dbController = require('./js/altDbController.js')
const app = express();
const server = require('http').Server(app);

const socket = require('./js/socket/SocketManager.js');
socket.initialize(server)


// TEMP stuff
const a = require(path.join(__dirname, 'routes/missions'));


// MIDDLEWARE
app.use(bodyParser.json());                  // using bodyParser to parse JSON bodies into js objects
// app.use(cors());                             // enabling CORS for all requests
// app.use(morgan('combined'));          // adding morgan to log HTTP requests
app.use(fileUpload({debug: true}));

app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(dbController.missionsDir))

app.use('/', express.static(path.join(__dirname, '../home')));
app.use('/player', express.static(path.join(__dirname, '../player')));
app.use('/author', express.static(path.join(__dirname, '../author')));
app.use('/supervisor', express.static(path.join(__dirname, '../supervisor')));
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use('/common', express.static(path.join(__dirname, '../common')));
//
app.use(express.static(path.join(__dirname, 'node_modules')));




app.use("/missions", a)

// dbController.deleteDbDir();
dbController.initializeDb();

// STARTING THE SERVER
server.listen(8000, () => {
  console.log('listening on port 8000');
});
