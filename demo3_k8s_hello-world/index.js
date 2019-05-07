const port = process.env.PORT || 8080;
const service_name = process.env.SERVICE_NAME || 'demo3';
const pod_name = process.env.POD_NAME || 'unknown';

const express = require('express');
const app = express();

app.get('/', async(req, res) => {
	setTimeout(() => res.end(`${service_name} - ${pod_name} - ${new Date().toISOString()}`), 100);
});

const server = app.listen(port, () => {
	console.log(`${service_name} listening on port ${port}!`)
});