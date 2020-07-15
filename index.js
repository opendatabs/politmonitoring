const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const config = require('./config/config');
const path = require('path');
const basicAuth = require('basic-auth');
const multer = require('multer');
const XLSX = require('xlsx');
const convertExcel = require('excel-as-json').processFile;
const fetch = require('node-fetch');

// open cors in development mode
if (config.cors) {
    app.use(cors());
}
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/data', express.static(__dirname + '/data/'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/data', (req, res) => {
    fs.readFile('data/data.json', 'utf8', (err, data) => {
        // if there is no file, return empty array
        if (err)
            res.status(500).send(err);
        else
        // data is already json.stringified
            res.send(data);
    })
});

app.get('/getcsv', async (req, res) => {
    const src = __dirname + '/uploads/politdaten.csv'
    if (fs.existsSync(src)) {
        res.download(src);
    } else {
        await createCSV();
        res.download(src)
    }
});

app.get('/get-data', async (req, res) => {

    const apiKey = config.apiKey ? config.apiKey : process.env.API_KEY;
    res.set('Authorization', apiKey)
    const apiUrl = `https://data.bs.ch/api/records/1.0/search/?apikey=${apiKey}&dataset=100086&q=&rows=1000&sort=-signatur&facet=signatur&facet=geschaftstyp&facet=gr_urheber&facet=urheber_name&facet=partei&facet=status&facet=beginn_datum&facet=ende&facet=endfrist&facet=thema_1&facet=thema_2&facet=schwerpunkt`;


    // apikey=${config.apiKey}&
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            res.send(data);
        })
        .catch(err => res.status(500).send(err))
});

// Basic authenticate user based on server side stored credentials
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
        cb(null, 'politdaten' + path.extname(file.originalname))
    }
});

const upload = multer({
    fileFilter: (req, file, cb) => {
        let filetype = /xlsx/;
        if (filetype.test(path.extname(file.originalname).toLowerCase()))
            return cb(null, true);
        cb('Error: File upload only supports the following filetype: ' + filetype);
    },
    storage: storage
}).single('file');

app.post('/upload', (req, res) => {
    let path = '';
    upload(req, res, (err) => {
        if (err) {
            return res.status(422).send('an Error occured')
        }
        convertData();
        path = req.file.path;
        return res.status(200).send('Upload Completed for ' + path);
    });
});

// convert data from .xlsx to .json and .csv
const convertData = () => {
    const src = './uploads/politdaten.xlsx';
    const dst = './data/data.json';
    if (fs.existsSync(src)) {
        convertExcel(src, dst, {
            sheet: '2', // Default worksheet is 1, if no options provided
            convertTextToNumber: false // No information loss on Geschäftsnummern like 07.110
        });
        createCSV();
    }
};

const createCSV = () => {
    try {
        const csvFilename = 'politdaten.csv';
        const wb = XLSX.readFile('./uploads/politdaten.xlsx');
        const ws = wb.Sheets[wb.SheetNames[1]]
        const stream = XLSX.stream.to_csv(ws);
        stream.pipe(fs.createWriteStream('./uploads/' + csvFilename));
    } catch (err) {
        return res.status(500).send('Data Parsing Error Occured: ' + err)
    }
}

// send all requests back to index for client side routing
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(5000, () => {
    console.log('App listening on port 5000')
});
