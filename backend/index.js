const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded( { extended : true } ));
app.use(bodyParser.json());
app.use(cors());

const backendFUN = require('./backendFUN');
const backendGET = require('./backendGET');
const backendPOST = require('./backendPOST');

app.get('/', backendGET.init);

app.get('/list', backendGET.serie);

app.get('/serie/:name', backendGET.serie_name);

app.get('/serie/:name/arcos', backendGET.serie_name_arcos);

app.get('/serie/:name/last', backendGET.serie_name_last);

app.get('/serie/:name/seassons', backendGET.serie_name_seassons);


app.post('/serie/:name', backendPOST.serie_name);

app.post('/serie/:name/last', backendPOST.serie_name_last);

const server = app.listen(8000, function() {

    console.log('Backend listen on:');
    console.log(backendFUN.getIp());
    console.log('port: ' + server.address().port);
});