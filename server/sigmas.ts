import * as chalk from 'chalk';
import * as express from 'express';

import { config } from './config';
import { pins } from './leds';

type Sigma = [string, number, number];

const getSigmas = (): Sigma[] => {
  const sigmas: Sigma[] = [];
  pins.forEach((v, k) => {
    const sigma: Sigma = [k, Math.random(), Date.now()];
    sigmas.push(sigma);
  });
  return sigmas;
};

export const sigmas = (app: express.Application,
                       port: number) => {

  const WebSocket = require('ws');
  const wss = new WebSocket.Server({path: '/ws/sigmas', port: port}, () => {
    console.log(chalk.green('Sigmas'), `localhost:${port}`);
  });

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
