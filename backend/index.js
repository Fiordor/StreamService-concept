const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded( { extended : true } ));
app.use(bodyParser.json());

const backendGET = require('./backendGET');
const backendPOST = require('./backendPOST');

app.get('/', backendGET.init);

app.get('/list', backendGET.serie);

app.get('/serie/:name', backendGET.serie_name);

app.post('/serie/:name', backendPOST.serie_name);

const server = app.listen(8000, function() {
    
    let host = server.address().address;
    let port = server.address().port;
    console.log('Backend listen on');
    console.log('host: ' + host);
    console.log('port: ' + port);
});