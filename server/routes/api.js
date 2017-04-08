const express = require('express');
const rpio = require("rpio");

const router = express.Router();

const pins = new Map([
  ['red', 15],
  ['yellow', 13],
  ['blue', 11]
]);

pins.forEach((v, k) => rpio.open(v, rpio.OUTPUT, rpio.LOW));

process.on("SIGINT", () => {
  pins.forEach((v, k) => {
    rpio.write(v, rpio.LOW);
    rpio.close(v, rpio.INPUT);
  });
  process.exit();
});

const states = new Map([
  ['on', rpio.HIGH],
  ['off', rpio.LOW]
]);

router.put('/pin/:color/:state', (req, res) => {
  const pin = pins.get(req.params['color']);
  const state = states.get(req.params['state']);
  rpio.write(pin, state);
});

module.exports = router;
