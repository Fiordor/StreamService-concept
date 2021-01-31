const fs = require('fs');
const fun = require('./backendFUN');

exports.serie_name = function(req, res) {

    let body = req.body;

    let jsonPath = fun.getPathJSON(req);

    fs.readFile(jsonPath, function(err, data) {

        if (err) { res.send('Error: POST serie_name'); return; }

        let id = parseInt(req.query.id);
        let json = JSON.parse(data);

        if (!fun.existsId(id, json)) { res.send('Error: POST serie_name id'); return; }
        if (body.minute == undefined) { res.send('Error: POST serie_name minute'); return; }
        if (body.watched == undefined) { res.send('Error: POST serie_name watched'); return; }

        json.info[id - 1][3] = body.minute;
        json.info[id - 1][4] = body.watched;

        
        fs.writeFile(jsonPath, JSON.stringify(json), 'utf8', (err) => {
            if (err) console.log('Error: POST serie_name bad save')
            else console.log('POST serie_name save');
        });

        res.send('ok');

    });
}