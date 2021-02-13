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

            let chapter = fun.getInfoChapter(id, json);

            res.send(chapter);
        } 
    });
}

exports.serie_name_arcos = function(req, res) {
    
    fs.readFile(fun.getPathJSON(req), function(err, data) {

        if (err) { res.send('Error: GET serie_name'); return; }

        let json = JSON.parse(data);

        let id = parseInt(req.query.id);

        if (!fun.existsArco(id, json)) {

            let json_out = [];

            for (let i = 0; i < json.arcos.length; i++) {
                json_out.push(fun.getInfoArco(i, json));
            }

            res.send(json_out);

        } else {

            arco = json.arcos[id - 1];

            let json_out = {
                fin : arco[3],
                info : [],
                ini : arco[2],
                relleno : arco[4],
                title : arco[1]
            };

            for (let i = arco[2]; i <= arco[3]; i++) {

                let chapter = fun.getInfoChapter(i, json);

                json_out.info.push(chapter);
            }

            res.send(json_out);
        } 
    });
}

exports.serie_name_last = function(req, res) {
    
    fs.readFile(fun.getPathJSON(req), function(err, data) {

        if (err) { res.send('Error: GET serie_name'); return; }

        let json = JSON.parse(data);

        let show = req.query.show;

        if (!fun.existsShow(show, json)) {

            let id = json.last;

            let json_out = {
                arco : fun.findByIdTheArco(id, json),
                last : id,
                seasson : fun.findByIdTheSeasson(id, json)
            };

            res.send(json_out);
            
        } else {

            let json_out = {
                id : json.last,
                idList : 0,
                info : [],
                relleno : undefined,
                title : ''
            };

            let ini = 0, fin = 0;

            if (show === 'seasson') {

                let id_seasson = fun.findByIdTheSeasson(json_out.id, json);
                let seasson = json.seassons[id_seasson - 1];
                json_out.idList = id_seasson;
                json_out.title = 'seasson ' + id_seasson;

                ini = seasson[1]; fin = seasson[2];

            } else {

                let id_arco = fun.findByIdTheArco(json_out.id, json);
                let arco = json.arcos[id_arco - 1];
                json_out.idList = id_arco;
                json_out.relleno = arco[4];
                json_out.title = arco[1];

                ini = arco[2]; fin = arco[3];
            }

            for (let i = ini; i <= fin; i++) {

                let chapter = fun.getInfoChapter(i, json);

                json_out.info.push(chapter);
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

            let json_out = [];

            for (let i = 0; i < json.seassons.length; i++) {
                json_out.push(fun.getInfoSeasson(i, json));
            }

            res.send(json_out);

        } else {

            seasson = json.seassons[seasson - 1];

            let json_out = {
                fin : seasson[2],
                info : [],
                ini : seasson[1],
                title : 'seasson ' + seasson[0]
            };

            for (let i = seasson[1]; i <= seasson[2]; i++) {

                let chapter = fun.getInfoChapter(i, json);

                json_out.info.push(chapter);
            }

            res.send(json_out);
        } 
    });
}