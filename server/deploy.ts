import * as chalk from 'chalk';
import * as express from 'express';
import * as http from 'http';

export const deploy = (app: express.Application,
                       port: number) => {
  app.set('port', port);
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(chalk.green('HTTP'), `localhost:${port}`);
  });
};
