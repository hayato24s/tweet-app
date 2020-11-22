import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { UserController } from "./controller/UserController";
import { configureDiContainer } from "./DiContainer";
import { PostController } from "./controller/PostController";
import { UserRoutes } from "./routing/UserRoutes";
import { PostRoutes } from "./routing/PostRoutes";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    const container = configureDiContainer();
   
    UserRoutes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            const controller = container.get<UserController>("UserController");
            controller[route.action](req).then((result) => {
                res.send(result);
            }).catch((error) => {
                res.send(error);
            })
        })
    })

    PostRoutes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            const controller = container.get<PostController>("PostController");
            controller[route.action](req).then((result) => {
                res.send(result);
            }).catch((error) => {
                res.send(error);
            })
        })
    })    

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
