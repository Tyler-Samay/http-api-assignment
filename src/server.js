const http = require('http');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);
    
    // Protocol is http or https
    const protocol = request.connection.encrypted ? 'https' : 'http';
    // Parse the URL into 3 parts: protocol, host, and query
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    // Add the query parameters to the request object (Ex: request.query.valid)
    request.query = Object.fromEntries(parsedUrl.searchParams);


    switch (request.url) {
            
        case '/':
            htmlHandler.getIndex(request, response);
            break;

        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;

        case '/success':
            // If headers accept is xml
            if (request.headers.accept === 'text/xml') {
                xmlHandler.success(request, response);
                break;
            }

            // Default to json
            else {
                jsonHandler.success(request, response);
                break;
            }
      
        case '/badRequest':
            // If headers accept is xml
            if (request.headers.accept === 'text/xml') {
                xmlHandler.badRequest(request, response);
                break;
            }

            // Default to json
            else {
                jsonHandler.badRequest(request, response);
                break;
            }

        case '/unauthorized':
            // If headers accept is xml
            if (request.headers.accept === 'text/xml') {
                xmlHandler.unauthorized(request, response);
                break;
            }

            // Default to json
            else {
                jsonHandler.unauthorized(request, response);
                break;
            }

        case '/forbidden':
            // If headers accept is xml
            if (request.headers.accept === 'text/xml') {
                xmlHandler.forbidden(request, response);
                break;
            }

            // Default to json
            else {
                jsonHandler.forbidden(request, response);
                break;
            }

        case '/internal':
            // If headers accept is xml
            if (request.headers.accept === 'text/xml') {
                xmlHandler.internal(request, response);
                break;
            }

            // Default to json
            else {
                jsonHandler.internal(request, response);
                break;
            }

        case '/notImplemented':
            // If headers accept is xml
            if (request.headers.accept === 'text/xml') {
                xmlHandler.notImplemented(request, response);
                break;
            }

            // Default to json
            else {
                jsonHandler.notImplemented(request, response);
                break;
            }

        case '/notFound':
            // If headers accept is xml
            if (request.headers.accept === 'text/xml') {
                xmlHandler.notFound(request, response);
                break;
            }

            // Default to json
            else {
                jsonHandler.notFound(request, response);
                break;
            }

        default:
            htmlHandler.getIndex(request, response);
            break;
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port ${port}`);