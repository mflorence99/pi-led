import * as bodyParser from 'body-parser';
import * as express from 'express';

import { config } from './config';
import { content } from './content';
import { cors } from './cors';
import { deploy } from './deploy';
import { isalive } from './isalive';
import { leds } from './leds';
import { sigmas } from './sigmas';

console.log(config);

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

app.get('/isalive', isalive);
leds(app);
app.get('*', content);

deploy(app, 3000);
sigmas(app, 4000);
