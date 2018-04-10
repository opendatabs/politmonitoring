const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const config = require('./config/config');
var path = require('path');
const basicAuth = require('basic-auth');
const multer = require('multer');
// const excel2Json = require('node-excel-to-json');
convertExcel = require('excel-as-json').processFile;


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

const auth = (req, res, next) => {
    const user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
    if (user.name === config.username && user.pass === config.password) {
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
};

app.get('/auth', auth, (req, res) => {
    res.send(true);
    return;
});

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, 'politdaten' + path.extname(file.originalname)) // TODO change to good name with timestamp
    }
});

const upload = multer({
    fileFilter: (req, file, cb) => {
        let filetype = /xlsx/; // TODO handle wrong filetype
        if (filetype.test(path.extname(file.originalname).toLowerCase()))
            return cb(null, true);
        cb("Error: File upload only supports the following filetype: " + filetype);
    },
    storage: storage})
    .single('file');

app.post('/upload', (req, res) => {
    let path = '';
    upload(req, res, (err) => {
        if (err) {
            console.log(err); // Give the user feedback right here
            return res.status(422).send("an Error occured")
        }
        convertData();
        // TODO file validation
        path = req.file.path;
        return res.status(200).send("Upload Completed for "+path);
    });
});

const convertData = () => {
    // TODO Check if err handling needed
    const src = './uploads/politdaten.xlsx';
    const dst = './data/data.json';
    if (fs.existsSync(src)) {
        convertExcel(src, dst); // TODO define clear excel rules for the user or check them
    }
};

// send all requests back to index for client side routing
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(5000, function () {
    console.log('Example app listening on port 5000')
});
