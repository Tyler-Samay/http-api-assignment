// Helper function to send a XML object
const respondXML = (request, response, status, responseXML) => {
    response.writeHead(status, {
        'Content-Type': 'text/xml',
    });
    response.write(responseXML);
    response.end();
};

// Success response
const success = (request, response) => {
    const responseXML = '<response><message>This is a successful response</message></response>';
    respondXML(request, response, 200, responseXML);
};

// Bad Request response
const badRequest = (request, response) => {
    let responseXML = '<response><message>This request has the required parameters</message></response>';

    if (!request.query.valid || request.query.valid !== 'true') {
        responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
        return respondXML(request, response, 400, responseXML);
    }

    return respondXML(request, response, 200, responseXML);
};

// Unauthorized response
const unauthorized = (request, response) => {
    let responseXML = '<response><message>You have successfully viewed the page.</message></response>';

    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
        responseXML = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';
        return respondXML(request, response, 401, responseXML);
    }

    return respondXML(request, response, 200, responseXML);
};

// Forbidden response
const forbidden = (request, response) => {
    const responseXML = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';
    respondXML(request, response, 403, responseXML);
};

// Internal Server Error response
const internal = (request, response) => {
    const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';
    respondXML(request, response, 500, responseXML);
};

// Not Implemented response
const notImplemented = (request, response) => {
    const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
    respondXML(request, response, 501, responseXML);
};

// Not Found response
const notFound = (request, response) => {
    const responseXML = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
    respondXML(request, response, 404, responseXML);
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
};