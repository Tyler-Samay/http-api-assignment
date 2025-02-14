const http = require('http');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);
    
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    request.query = Object.fromEntries(parsedUrl.searchParams);

    switch (request.url) {
        case '/':
        htmlHandler.getIndex(request, response);
        break;

        case '/style.css':
        htmlHandler.getCSS(request, response);
        break;

        case '/success':
        jsonHandler.success(request, response);
        break;

        case '/badRequest':
        jsonHandler.badRequest(request, response);
        break;

        case '/unauthorized':
        jsonHandler.unauthorized(request, response);
        break;

        case '/forbidden':
        jsonHandler.forbidden(request, response);
        break;

        case '/internal':
        jsonHandler.internal(request, response);
        break;

        case '/notImplemented':
        jsonHandler.notImplemented(request, response);
        break;

        default:
        htmlHandler.getIndex(request, response);
        break;
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port ${port}`);




