const http = require('http')
const url = require('url')

const routes = ('./routes')

module.exports = http.createServer((req, res) => {

    var service = require('./service.js')
    const reqUrl = url.parse(req.url, true)

    if (reqUrl.pathname == '/authenticate' && req.method === 'POST') {
        console.log('[' + res.statusCode + ']' + ' Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname)

        service.authenticate(req, res)

        // POST 
    } else if (reqUrl.pathname == '/author' && req.method === 'GET') {
        console.log('[' + res.statusCode + ']' + ' Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname)

        service.sampleRequest(req, res)

    } else if (reqUrl.pathname == '/author' && req.method === 'GET') {

    } else if (reqUrl.pathname == '/author/page/create' && req.method === 'POST') {

        service.createpage(req, res)

    } else if (reqUrl.pathname == '/author/page/list' && req.method === 'GET') {

        service.listpages(req, res)

    } else if (reqUrl.pathname == '/author/page/read' && req.method === 'GET') {

        service.readpage(req, res)

    } else if (reqUrl.pathname == '/author/page/update' && req.method === 'PATCH') {

        service.updatepage(req, res)

    } else if (reqUrl.pathname == '/author/page/delete' && req.method === 'DELETE') {

        service.deletepage(req, res)

    } else if (reqUrl.pathname == '/comment/publish' && req.method === 'POST') {

        service.publishcomments(req, res)

    }
    else if (reqUrl.pathname == '/author/article/create' && req.method === 'POST') {

        service.createarticles(req, res)

    } else if (reqUrl.pathname == '/author/article/list' && req.method === 'GET') {

        service.listarticles(req, res)

    } else if (reqUrl.pathname == '/author/article/read' && req.method === 'GET') {

        service.readarticle(req, res)

    } else if (reqUrl.pathname == '/author/article/update' && req.method === 'PATCH') {

        service.updatearticle(req, res)

    } else if (reqUrl.pathname == '/author/article/delete' && req.method === 'DELETE') {

        service.deletearticle(req, res)
    }
    else if (reqUrl.pathname == '/comment/delete' && req.method === 'DELETE') {

        service.deletecomments(req, res)

    } else {
        console.log('[400] Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname)

        service.invalidRequest(req, res)
    }
})
