import * as express from 'express';
import * as rpio from 'rpio';

import { Setting } from './models/setting';

export const pins = new Map([
  ['red', 15],
  ['yellow', 13],
  ['blue', 11]
]);

const states = new Map([
  ['false', rpio.LOW],
  ['true', rpio.HIGH]
]);

const lookup = new Map([
  [rpio.LOW, false],
  [rpio.HIGH, true]
]);

pins.forEach((v, k) => rpio.open(v, rpio.OUTPUT, rpio.LOW));

process.on('SIGINT', () => {
  pins.forEach((v, k) => {
    rpio.write(v, rpio.LOW);
    rpio.close(v, rpio.PIN_RESET);
  });
  process.exit();
});

const getSettings = (): Setting[] => {
  const settings: Setting[] = [];
  pins.forEach((v, k) => {
    const setting: Setting = [k, lookup.get(rpio.read(v))];
    settings.push(setting);
  });
  return settings;
};

const getSetting = (color: string): boolean => {
  const led = pins.get(color);
  return lookup.get(rpio.read(led));
};

const setSettings = (settings: Setting[]) => {
  settings.forEach(setting => {
    const led = pins.get(setting[0]);
    const state = states.get(String(setting[1]));
    rpio.write(led, state);
  });
};

const setSetting = (color: string, state: boolean) => {
  const led = pins.get(color);
  rpio.write(led, states.get(String(state)));
};

export const leds = (app: express.Application) => {

  app.get('/api/leds',
    (req: express.Request, res: express.Response) => {
      const settings = getSettings();
      console.log(`GET LEDS = ${JSON.stringify(settings)}`);
      res.json(settings);
    });

  app.put('/api/leds',
    (req: express.Request, res: express.Response) => {
      const settings: Setting[] = req.body;
      setSettings(settings);
      console.log(`SET LEDS ${JSON.stringify(req.body)}`);
      res.json(settings);
    });

  app.get('/api/led/:color',
    (req: express.Request, res: express.Response) => {
      const state = getSetting(req.params['color']);
      console.log(`GET ${JSON.stringify(req.params)} = ${state}`);
      res.json({state: state});
    });

  app.put('/api/led/:color/:state',
    (req: express.Request, res: express.Response) => {
      setSetting(req.params['color'], req.params['state'] === 'true');
      console.log(`SET ${JSON.stringify(req.params)}`);
      res.json(getSettings());
    });

};
