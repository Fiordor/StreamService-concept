const fs = require('fs');
const fun = require('./backendFUN');

exports.init = function(req, res) {

    let out =
        '<pre>******************************\n' +
        '*                            *\n' +
        '* Welcome to express backend *\n' +
        '*                            *\n' +
        '******************************</pre>';
    
    res.send(out);
}

exports.serie = function(req, res) {
    
    let json = JSON.parse( '{ "series" : [ "Naruto", "Shippuden" ], "size" : 2 }' );

    res.setHeader('Content-Type', 'application/json');
    res.send(json);
}

exports.serie_name = function(req, res) {

    fs.readFile(fun.getPathJSON(req), function(err, data) {

        if (err) { res.send('Error: GET serie_name'); return; }

        let json = JSON.parse(data);

        let id = parseInt(req.query.id);

        if (!fun.existsId(id, json)) {
            res.send(json.number.toString());
        } else {

            let url = fun.getUrl(id, json);

            let chapter = fun.getIdInfo(id, json.info);

            let out = {
                id : id,
                finish : chapter[4],
                minute : chapter[3],
                relleno : chapter[2],
                title : chapter[1],
                url : url
            }

            res.send(out);
        } 
    });
}

exports.serie_name_arcos = function(req, res) {
    
    fs.readFile(fun.getPathJSON(req), function(err, data) {

        if (err) { res.send('Error: GET serie_name'); return; }

        let json = JSON.parse(data);

        let arco = parseInt(req.query.id);

        if (!fun.existsArco(arco, json)) {
            res.send(json.arcos);
        } else {

            arco = json.arcos[arco - 1];

            let json_out = { "title" : arco[1], "info" : [] }
            
            for (let i = arco[2] - 1; i < arco[3]; i++) {
                json_out.info.push(json.info[i]);
            }

            res.send(json_out);
        } 
    });
}

exports.serie_name_seassons = function(req, res) {
    
    fs.readFile(fun.getPathJSON(req), function(err, data) {

        if (err) { res.send('Error: GET serie_name'); return; }

        let json = JSON.parse(data);

        let seasson = parseInt(req.query.id);

        if (!fun.existsSeasson(seasson, json)) {
            res.send(json.seassons);
        } else {

            seasson = json.seassons[seasson - 1];

            let json_out = []
            
            for (let i = seasson[1] - 1; i < seasson[2]; i++) {
                json_out.push(json.info[i]);
            }

            res.send(json_out);
        } 
    });
}