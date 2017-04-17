import * as express from 'express';

export const isalive = (req: express.Request,
                        res: express.Response) => {
  res.sendStatus(200);
};
