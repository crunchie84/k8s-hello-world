const port = process.env.PORT || 8080;
const service_name = process.env.SERVICE_NAME || 'demo4_v1';
const pod_name = process.env.POD_NAME || 'unknown';

const express = require('express');
const stoppable = require('stoppable');
const app = express();
let ready = false;

app.get('/', async(req, res) => {
	setTimeout(() => res.end(`${service_name} - ${pod_name} - ${new Date().toISOString()}`), 400);
});

app.get('/ready', (req, res) => {
	if (!ready) {
		return res.sendStatus(503);
	}
	res.sendStatus(200);
});

const server = stoppable(app.listen(port, () => {
	ready = true;
	console.log(`${service_name} listening on port ${port}!`)
}), 1000);



// Application shutdown
process.on("SIGTERM", gracefulShutdown.bind(null, "SIGTERM"));
process.on("SIGINT", gracefulShutdown.bind(null, "SIGINT"));
process.on("SIGHUP", gracefulShutdown.bind(null, "SIGHUP"));

function gracefulShutdown(evt) {
	console.log(`Received shutdown event ${evt}, draining connections before shutdown`);
	ready = false;

	server.close((err, isGracefullShutdown) => {
		if(err) {
			console.err(`error while closing server: ${err.stack}`);
			process.exit(1);
		}
		console.log('connections drained, exiting');
		process.exit();
	});
}