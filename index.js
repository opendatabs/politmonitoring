const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config');
const path = require('path');
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

// get data from data.bs.ch with api key
app.get('/get-data', async (req, res) => {

    const apiKey = config.apiKey ? config.apiKey : process.env.API_KEY;
    res.set('Authorization', apiKey)
    const apiUrl = `https://data.bs.ch/api/records/1.0/search/?apikey=${apiKey}&dataset=100086&q=&rows=2000&sort=-signatur&facet=signatur&facet=geschaftstyp&facet=gr_urheber&facet=urheber_name&facet=partei&facet=status&facet=beginn_datum&facet=ende&facet=endfrist&facet=thema_1&facet=thema_2&facet=schwerpunkt`;


    // apikey=${config.apiKey}&
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            res.send(data);
        })
        .catch(err => res.status(500).send(err))
});

// send all requests back to index for client side routing
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(5000, () => {
    console.log('App listening on port 5000')
});
