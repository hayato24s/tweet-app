import { UserInteractor } from "./interactor/UserInteractor";
import { IUserUseCase } from "./usecase/UserUseCase";
import { IUserRepository } from "./repository/IUserRepository";
import { UserRepository } from "./gateway/UserRepository";
import { UserController } from "./controller/UserController"; 
import { PostController } from "./controller/PostController";
import { IPostUseCase } from "./usecase/PostUseCase";
import { IPostRepository } from "./repository/IPostRepository";
import { PostRepository } from "./gateway/PostRepository";
import { PostInteractor } from "./interactor/PostInteractor";



import { Container } from "inversify"

const container = new Container();

export function configureDiContainer(): Container {
    container.bind<UserController>("UserController").to(UserController);
    container.bind<IUserUseCase>("UserInteractor").to(UserInteractor);
    container.bind<IUserRepository>("UserRepository").to(UserRepository);
    container.bind<PostController>("PostController").to(PostController);
    container.bind<IPostUseCase>("PostInteractor").to(PostInteractor);
    container.bind<IPostRepository>("PostRepository").to(PostRepository);
    return container;
}