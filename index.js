const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const config = require('./config/config');
var path = require('path');

// open cors in development mode
if (config.cors) {
    app.use(cors());
}
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/data', express.static(__dirname + '/data/'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/data', function (req, res) {
    fs.readFile('data/data.json', "utf8", function (err, data) {
        // if there is no file, return empty array
        if (err)
            res.status(500).send(err);
        else
        // data is already json.stringified
            res.send(data);
    })
});

// send all requests back to index for client side routing
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(5000, function () {
    console.log('Example app listening on port 5000')
});
