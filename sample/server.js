const http = require('http');

const server = http.createServer((req, resp) => {
    resp.end('respond from my server');
 });

 console.log('listening..');
 server.listen(3000);


