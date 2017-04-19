import * as chalk from 'chalk';
import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';

import { Sigma } from './models/sigma';
import { config } from './config';
import { pins } from './leds';

const getSigmas = (): Sigma[] => {
  const sigmas: Sigma[] = [];
  pins.forEach((v, k) => {
    const sigma: Sigma = [k, Math.random(), Date.now()];
    sigmas.push(sigma);
  });
  return sigmas;
};

const options = {
  key  : fs.readFileSync(`${__dirname}/ssl/key.pem`),
  ca   : fs.readFileSync(`${__dirname}/ssl/csr.pem`),
  cert : fs.readFileSync(`${__dirname}/ssl/cert.pem`)
};

export const sigmas = (app: express.Application,
                       port: number) => {

  const server = https.createServer(options).listen(port);
  const WebSocket = require('ws');
  const wss = new WebSocket.Server({path: '/ws/sigmas', server: server});
  console.log(chalk.green('WS /ws/sigmas'), `localhost:${port}`);

  wss.on('connection', ws => {
    let timer = null;
    const sender = () => {
      ws.send(JSON.stringify(getSigmas()), error => {
        if (error && timer)
          clearInterval(timer);
      });
    };
    timer = setInterval(sender, config.sigmasCaptureInterval);
  });

};
