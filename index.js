var express = require('express');
var app = express();
var Gun = require('gun');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/dist'));

app.get('/', function (request, response) {
    response.sendFile('dist/index.html', {root: __dirname});
});

var server = app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

Gun({
    file: 'data.json',
    web: server
});
app.use(Gun.serve);
console.log('Gun started');
