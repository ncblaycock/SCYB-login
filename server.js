#!/usr/bin/env node
const { readFileSync, existsSync } = require('fs');
const http = require('http');
const https = require('https');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const DEFAULT_HTTP_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DEFAULT_HTTPS_PORT = process.env.HTTPS_PORT ? parseInt(process.env.HTTPS_PORT, 10) : 3443;

app.prepare().then(() => {
  if (process.env.USE_HTTPS === '1' || process.env.USE_HTTPS === 'true') {
    const keyPath = process.env.HTTPS_KEY || './certs/localhost-key.pem';
    const certPath = process.env.HTTPS_CERT || './certs/localhost-cert.pem';

    if (!existsSync(keyPath) || !existsSync(certPath)) {
      console.error(`HTTPS requested but key/cert not found at ${keyPath} and ${certPath}.`);
      console.error('Set HTTPS_KEY/HTTPS_CERT or generate local certs (e.g. mkcert). Falling back to HTTP.');
      startHttp();
      return;
    }

    const options = { key: readFileSync(keyPath), cert: readFileSync(certPath) };
    const httpsPort = DEFAULT_HTTPS_PORT;

    https.createServer(options, (req, res) => handle(req, res)).listen(httpsPort, (err) => {
      if (err) { console.error(err); process.exit(1); }
      console.log(`> Ready on https://localhost:${httpsPort} (dev=${dev})`);
    });

    if (process.env.REDIRECT_HTTP === '1') {
      const httpPort = DEFAULT_HTTP_PORT;
      http.createServer((req, res) => {
        const host = req.headers.host ? req.headers.host.split(':')[0] : 'localhost';
        res.writeHead(301, { Location: `https://${host}:${httpsPort}${req.url}` });
        res.end();
      }).listen(httpPort, () => console.log(`> HTTP redirecting to HTTPS on port ${httpPort}`));
    }

  } else {
    startHttp();
  }
});

function startHttp() {
  const port = DEFAULT_HTTP_PORT;
  http.createServer((req, res) => handle(req, res)).listen(port, (err) => {
    if (err) { console.error(err); process.exit(1); }
    console.log(`> Ready on http://localhost:${port} (dev=${dev})`);
  });
}
