const express = require('express');
const rpio = require("rpio");

const router = express.Router();

const leds = new Map([
  ['red', 15],
  ['yellow', 13],
  ['blue', 11]
]);

leds.forEach((v, k) => rpio.open(v, rpio.OUTPUT, rpio.LOW));

process.on("SIGINT", () => {
  leds.forEach((v, k) => {
    rpio.write(v, rpio.LOW);
    rpio.close(v, rpio.PIN_RESET);
  });
  process.exit();
});

const states = new Map([
  ['false', rpio.LOW],
  ['true', rpio.HIGH]
]);

const lookup = new Map([
  [rpio.LOW, false],
  [rpio.HIGH, true]
]);

router.get('/leds', (req, res) => {
  let settings = [];
  leds.forEach((v, k) => {
    const setting = [k, lookup.get(rpio.read(v))];
    settings.push(setting)
  });
  console.log(`GET LEDS = ${JSON.stringify(settings)}`);
  res.json(settings);
});

router.put('/leds', (req, res) => {
  console.log(`SET LEDS ${JSON.stringify(req.body)}`);
  let settings = req.body;
  settings.forEach(setting => {
    const led = leds.get(setting[0]);
    const state = states.get(String(setting[1]));
    rpio.write(led, state);
  });
  res.sendStatus(200);
});

router.get('/led/:color', (req, res) => {
  const led = leds.get(req.params['color']);
  const state = rpio.read(led);
  console.log(`GET ${JSON.stringify(req.params)} = ${state}`);
  res.json({state: (state === rpio.HIGH)});
});

router.put('/led/:color/:state', (req, res) => {
  console.log(`SET ${JSON.stringify(req.params)}`);
  const led = leds.get(req.params['color']);
  const state = states.get(req.params['state']);
  rpio.write(led, state);
  res.sendStatus(200);
});

module.exports = router;
