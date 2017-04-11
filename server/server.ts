import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as rpio from 'rpio';

const app: express.Application = express();

const leds = new Map([
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

leds.forEach((v, k) => rpio.open(v, rpio.OUTPUT, rpio.LOW));

process.on('SIGINT', () => {
  leds.forEach((v, k) => {
    rpio.write(v, rpio.LOW);
    rpio.close(v, rpio.PIN_RESET);
  });
  process.exit();
});

type Setting = [string, boolean];

const getAll = (): Setting[] => {
  const settings: Setting[] = [];
  leds.forEach((v, k) => {
    const setting: Setting = [k, lookup.get(rpio.read(v))];
    settings.push(setting);
  });
  return settings;
};

const getOne = (color: string): boolean => {
  const led = leds.get(color);
  return lookup.get(rpio.read(led));
};

const setAll = (settings: Setting[]) => {
  settings.forEach(setting => {
    const led = leds.get(setting[0]);
    const state = states.get(String(setting[1]));
    rpio.write(led, state);
  });
};

const setOne = (color: string, state: boolean) => {
  const led = leds.get(color);
  rpio.write(led, states.get(String(state)));
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req: express.Request,
         res: express.Response,
         next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/isalive',
  (req: express.Request, res: express.Response) => {
    res.sendStatus(200);
  });

app.get('/api/leds',
  (req: express.Request, res: express.Response) => {
    const settings = getAll();
    console.log(`GET LEDS = ${JSON.stringify(settings)}`);
    res.json(settings);
  });

app.put('/api/leds',
  (req: express.Request, res: express.Response) => {
    const settings: Setting[] = req.body;
    setAll(settings);
    console.log(`SET LEDS ${JSON.stringify(req.body)}`);
    res.json(settings);
  });

app.get('/api/led/:color',
  (req: express.Request, res: express.Response) => {
    const state = getOne(req.params['color']);
    console.log(`GET ${JSON.stringify(req.params)} = ${state}`);
    res.json({state: state});
  });

app.put('/api/led/:color/:state',
  (req: express.Request, res: express.Response) => {
    setOne(req.params['color'], req.params['state'] === 'true');
    console.log(`SET ${JSON.stringify(req.params)}`);
    res.json(getAll());
  });

app.get('*',
  (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Express is running on localhost:${port}`));
