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

            let url = json.url + urlExceptionController(id, json.url_exceptions);

            let chapter = getIdInfo(id, json.info);

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