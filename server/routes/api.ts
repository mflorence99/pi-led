import express = require('express');
import rpio = require('rpio');

const router = express.Router();

const leds = new Map([
  ['red', 15],
  ['yellow', 13],
  ['blue', 11]
]);

leds.forEach((v, k) => rpio.open(v, rpio.OUTPUT, rpio.LOW));

process.on('SIGINT', () => {
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


module.exports = router;
