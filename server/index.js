var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/author', express.static('./m-and-m/author'));


app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

