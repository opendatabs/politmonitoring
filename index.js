const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config');
const path = require('path');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

// honour HTTPS_PROXY if set (node-fetch does not do this on its own)
const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy;
const fetchAgent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

// open cors in development mode
if (config.cors) {
    app.use(cors());
}
app.use('/data', express.static(__dirname + '/data/'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

// get data from data.bs.ch (public dataset, no API key required)
app.get('/get-data', async (req, res) => {

    const apiUrl = `https://data.bs.ch/api/records/1.0/search/?dataset=100086&q=&rows=2000&sort=-signatur&facet=signatur&facet=geschaftstyp&facet=gr_urheber&facet=urheber_name&facet=partei&facet=status&facet=beginn_datum&facet=ende&facet=endfrist&facet=thema_1&facet=thema_2&facet=schwerpunkt`;


    fetch(apiUrl, { agent: fetchAgent })
        .then(response => response.json())
        .then(data => {
            res.send(data);
        })
        .catch(err => res.status(500).send(err))
});

// send all requests back to index for client side routing
app.get('/{*splat}', (req, res) => { // Express 5 wildcard syntax
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(5000, () => {
    console.log('App listening on port 5000')
});
