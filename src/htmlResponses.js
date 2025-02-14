const fs = require('fs'); // require the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

// get the index page
const getIndex = (request, response) => {
    response.writeHead(200, { 
        'Content-Type': 'text/html',
        'Content-Length': Buffer.byteLength(index, 'utf8'),
     });
    response.write(index);
    response.end();
}


// get the style.css file
const getCSS = (request, response) => {
    response.writeHead(200, { 
        'Content-Type': 'text/css',
        'Content-Length': Buffer.byteLength(style, 'utf8'),
     });
    response.write(style);
    response.end();
}

module.exports = { 
    getIndex, 
    getCSS};