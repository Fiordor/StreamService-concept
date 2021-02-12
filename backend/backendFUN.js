
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

exports.getIdInfo = (id, list) => {

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