//const url = require('url');

// Helper function to send a JSON object
const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  response.writeHead(status, { 
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  response.write(content);
  response.end();
};

// Success response
const success = (request, response) => {
  const responseJSON = { message: 'This is a successful response' };
  respondJSON(request, response, 200, responseJSON);
};

// Bad Request response
const badRequest = (request, response) => {
    const responseJSON = {
      message: 'This request has the required parameters',
    };
  
    if (!request.query.valid || request.query.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON);
    }
  
    return respondJSON(request, response, 200, responseJSON);
  };

// Unauthorized response
const unauthorized = (request, response) => {
  const responseJSON = { message: 'You have successfully viewed the page.' };

  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

// Forbidden response
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };
  respondJSON(request, response, 403, responseJSON);
};

// Internal Server Error response
const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong!',
    id: 'internalError',
  };
  respondJSON(request, response, 500, responseJSON);
};

// Not Implemented response
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'This functionality is not implemented yet.',
    id: 'notImplemented',
  };
  respondJSON(request, response, 501, responseJSON);
};

// Not Found response
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

// Export handlers
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
