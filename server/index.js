var express = require('express');
var app = express();
var path = require('path')

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/author', express.static(path.join(__dirname, '../author')));



app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

