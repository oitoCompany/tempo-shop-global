var cors_proxy = require('cors-anywhere');

// Listen on a specific IP Address
var host = 'http://sapgw.tempo.co.il/';

// Listen on a specific port, adjust if necessary
var port = 8002;

cors_proxy.createServer({
	originWhitelist: [], // Allow all origins
	requireHeader: ['origin', 'x-requested-with'],
	removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
	console.log('Running CORS Anywhere on ' + host + ':' + port);
});