import * as chalk from 'chalk';
import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';

const options = {
  key  : fs.readFileSync(`${__dirname}/ssl/key.pem`),
  ca   : fs.readFileSync(`${__dirname}/ssl/csr.pem`),
  cert : fs.readFileSync(`${__dirname}/ssl/cert.pem`)
};

export const deploy = (app: express.Application,
                       port: number): https.Server => {
  const server = https.createServer(options, app);
  server.listen(port, () => {
    console.log(chalk.green('HTTPS'), `localhost:${port}`);
  });
  return server;
};
