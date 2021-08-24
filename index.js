const http = require('http')
const controller = require('./controller/controller.js');
const axios = require('axios');


const PROVIDERS = 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json ';
const CLIENTS = 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json '
const SERVICES = {prov: PROVIDERS, cli: CLIENTS};

async function getDatafromAnotherServer(url) {
    const resp = await axios.get(url);
    console.log(resp.data)
    return resp.data;

}

// Crea una nueva instancia del servidor
http
    .createServer(async function (req, res) {
        // Encabezado de la respuesta por defecto del servidor
        res.writeHead(200, {'Content-Type': 'text/html'});

        if (req.url === '/api/proveedores') {

            const data = await getDatafromAnotherServer(SERVICES['prov']);
            controller.renderHTML('prov', data, res);

        } else if (req.url === '/api/clientes') {
            const data = await getDatafromAnotherServer(SERVICES['cli']);
            controller.renderHTML('cli', data, res);
        } else {
            res.end('<h1>Helloo :)</h1>')
        }

    })
    .listen(8081); // Puerto que usará el servidor para escuchar las solicitudes


