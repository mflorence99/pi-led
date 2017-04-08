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
    rpio.close(v, rpio.INPUT);
  });
  process.exit();
});

const states = new Map([
  ['on', rpio.HIGH],
  ['off', rpio.LOW]
]);

router.put('/led/:color/:state', (req, res) => {
  const led = leds.get(req.params['color']);
  const state = states.get(req.params['state']);
  rpio.write(led, state);
  console.log(`${led}=${state}`);
  res.sendStatus(200);
});

module.exports = router;
