
const NARUTO = './naruto.json';
const SHIPPUDEN = './shippuden.json';

exports.existsId = (id, json) => {
    return id != undefined &&
        Number.isInteger(id) &&
        id >= 0 &&
        id <= json.number;
}

exports.getIdInfo = (id, list) => {

    for (let i = 0; i < list.length; i++) {
        if (id == list[i][0]) return list[i];
    }
}

exports.getPathJSON = (req) => {
    let name = req.params.name;

    switch (name) {
        case 'Naruto': return NARUTO;
        case 'Shippuden': return SHIPPUDEN;
        default: return 'error';
    }
}

exports.urlExceptionController = (id, urls) => {

    for (let i = 0; i < urls.length; i++) {
        if (urls[i][0] == id) return urls[i][1];
    }
    return id;
}