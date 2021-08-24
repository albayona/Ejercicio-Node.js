const axios = require('axios');
const fs = require('fs');

const WEB_PATH = './view/index.html';

const PROVIDERS_COLS = ['idproveedor', 'nombrecompania', 'nombrecontacto'];
const CLIENTS_COLS = ['idCliente', 'NombreCompania', 'NombreContacto'];
const COLS = {prov: PROVIDERS_COLS, cli: CLIENTS_COLS};


exports.renderHTML = function (role, data, res) {

    let myTable = createTable(data, role);
    let web =  insertTableOnHtml(myTable);
    res.end(web);

};


const insertTableOnHtml = function (table) {
    let substring1 = fs.readFileSync(WEB_PATH, "utf8").substring(0, getPositionOfTag('<tbody>'));
    let substring2 = fs.readFileSync(WEB_PATH, "utf8").substring(getPositionOfTag('</tbody>'));
    let html = substring1 + '<tbody>' + table + substring2;
    return html;
};

const getPositionOfTag = function (tag) {
    let web = fs.readFileSync(WEB_PATH, "utf8");
    let pos = web.lastIndexOf(tag);
    return pos;
};


const createTable = function (data, role) {
    let myTable = '';
    for (const i in data) {
        myTable += '<tr>';

        COLS[role].forEach((col) => {
            myTable += '<td>' + data[i][col] + '</td>';
        });

        myTable += '</tr>';
    }

    return myTable;
};


