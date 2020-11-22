import * as express from 'express';
import {UserController} from '../controller/UserController';
import {Request, Response, NextFunction} from 'express';
import { ClientResponse } from 'http';

const UserRouter: express.Router = express.Router();

/*
UserRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let savedUser = await (new UserController).getAllUser(req , res, next);
    res.send(savedUser);
})

UserRouter.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    let user = await (new UserController).getOneUser(req, res, next);
    res.send(user); 
})
*/

module.exports = UserRouter;

