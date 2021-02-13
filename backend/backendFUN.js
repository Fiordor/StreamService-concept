
const NARUTO = './naruto.json';
const SHIPPUDEN = './shippuden.json';

const { networkInterfaces } = require('os');

exports.existsArco = (arco, json) => {
    return arco != undefined &&
        Number.isInteger(arco) &&
        arco >= 1 &&
        arco <= json.arcos.length;
}

exports.existsId = (id, json) => {
    return id != undefined &&
        Number.isInteger(id) &&
        id >= 1 &&
        id <= json.number;
}

exports.existsSeasson = (seasson, json) => {
    return seasson != undefined &&
        Number.isInteger(seasson) &&
        seasson >= 1 &&
        seasson <= json.seassons.length;
}

exports.existsShow = (show, json) => {
    return show != undefined &&
        (show == 'seasson' || show == 'arco');
}

exports.findByIdTheArco = (id, json) => {

    let arcos = json.arcos;
    
    for (let i = 0; i < arcos.length; i++) {

        if (arcos[i][2] <= id && id <= arcos[i][3]) {
            return arcos[i][0];
        }
    }
    return null;
}

exports.findByIdTheSeasson = (id, json) => {

    let seassons = json.seassons;
    
    for (let i = 0; i < seassons.length; i++) {

        if (seassons[i][1] <= id && id <= seassons[i][2]) {
            return seassons[i][0];
        }
    }
    return null;
}

exports.getInfoArco = (id, json) => {

    let arco = {
        fin : json.arcos[id][3],
        ini : json.arcos[id][2],
        id : json.arcos[id][0],
        relleno : json.arcos[id][4],
        title : json.arcos[id][1]
    };

    return arco;
}

exports.getInfoChapter = (id, json) => {

    id--;

    let chapter = {
        id : json.info[id][0],
        finish : json.info[id][4],
        minute : json.info[id][3],
        relleno : json.info[id][2],
        title : json.info[id][1],
        url : this.getUrl(json.info[id][0], json)
    };

    return chapter;
}

exports.getInfoSeasson = (id, json) => {

    let seasson = {
        fin : json.seassons[id][2],
        ini : json.seassons[id][1],
        id : json.seassons[id][0],
    };

    return seasson;
}

exports.getInfoId = (id, list) => {

    return list[id - 1];
}

exports.getIp = () => {

    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    return results;
}

exports.getPathJSON = (req) => {
    let name = req.params.name;

    switch (name) {
        case 'naruto': return NARUTO;
        case 'shippuden': return SHIPPUDEN;
        default: return 'error';
    }
}

exports.getUrl = (id, json) => {

    let urls = json.url_exceptions;

    for (let i = 0; i < urls.length; i++) {
        if (urls[i][0] == id) return json.url + urls[i][1];
    }
    return json.url + id;
}