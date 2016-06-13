var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var fs = require('fs');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 7770;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/twitter', function(req, res) {
  var file = JSON.parse(fs.readFileSync('client/data/markers.json', 'utf8'));
  var result = [];
  if(req.query.filter){
    file.forEach(function (row) {
      if(req.query.filter.indexOf(row.title) >= 0){
        result.push(row);
      }
    });
  }
  res.send(result);
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + port);
});
