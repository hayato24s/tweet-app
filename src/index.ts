import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import {Post} from "./entity/Post";
import { UserController } from "./controller/UserController";
import { configureDiContainer } from "./DiContainer";
import { PostController } from "./controller/PostController";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    /*
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    */
    

    /*
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            result.then(result => result !== null && result !== undefined ? res.send(result) : res.send('error'));
        })
    })
    */

    const container = configureDiContainer();

    app.get('/users', async (req: Request, res: Response, next: Function) => {

        const userController = container.get<UserController>("UserController");
        userController.findAllUser(req).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        })
    })

    app.get('/users/:name', async (req: Request, res: Response, next: Function) => {
        const userController = container.get<UserController>("UserController");
        userController.findUserByName(req).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        })
    })

    app.post('/users', async (req: Request, res: Response, next: Function) => {
        const userController = container.get<UserController>("UserController");
        userController.createUser(req).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
    })
    
    app.put('/users/:name', async (req: Request, res: Response, next: Function) => {
        const userController = container.get<UserController>("UserController");
        userController.updateUser(req).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
    })

    app.delete('/users/:name', async (req: Request, res: Response, next: Function) => {
        const userController = container.get<UserController>("UserController");
        userController.deleteUser(req).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
    })

    app.get('/posts', async(req: Request, res: Response, next: Function) => {
        const postController = container.get<PostController>("PostController");
        postController.findPosts(req).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
    })
    
    app.get('/posts/:id', async(req: Request, res: Response, next: Function) => {
        const postController = container.get<PostController>("PostController");
        postController.findPostById(req).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
    })

    app.post('/posts', async(req: Request, res: Response, next: Function) => {
        const postController = container.get<PostController>("PostController");
        postController.createPost(req).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
    })

    app.delete('/posts/:id', async(req: Request, res: Response, next: Function) => {
        const postController = container.get<PostController>("PostController");
        postController.deletePost(req).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
    })

    /*
    const UserRouter = require('./routing/UserRoute');
    app.use('/users', UserRouter);
    */

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    /*
    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        // firstName: "Timber",
        // lastName: "Saw",
        // age: 27
        name: 'Ito'
    }));
    await connection.manager.save(connection.manager.create(User, {
        // firstName: "Phantom",
        // lastName: "Assassin",
        // age: 24
        name: 'Kato'
    }));
    */
    

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
