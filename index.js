const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const config = require('./config/config');


// open cors in development mode
if (config.cors) {
    app.use(cors());
}
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/view', express.static(__dirname + '/view/'));
app.use('/data', express.static(__dirname + '/data/'));

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

app.listen(5000, function () {
    console.log('Example app listening on port 5000')
});
