import * as express from 'express';
import * as path from 'path';

export const content = (req: express.Request,
                        res: express.Response) => {
    const name = req.path.substring(1);
    res.sendFile(path.join(__dirname, '../dist', name? name : 'home.html'));
};
 
