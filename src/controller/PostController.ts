import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Post} from "../entity/Post";
import { request } from "http";
import { PostInteractor } from "../interactor/PostInteractor";
import { IPostUseCase } from "../usecase/PostUseCase";
import { inject, injectable } from "inversify";

@injectable()
export class PostController {

    /*
    private PostRepository = getRepository(Post);
    async one(req: Request, res: Response, next: NextFunction) {
        return this.PostRepository.findOne(req.params.id);
    }
    */

    readonly postInteractor: IPostUseCase;

    constructor(@inject("PostInteractor") postInteractor: IPostUseCase) {
        this.postInteractor = postInteractor;
    }

    // 入力データの不整合を検出
    isPost(obj: any): obj is Post{
        const dtype = {content: "string", userId: "string"};
        // 予期せぬkeyが含まれていないか
        if (Object.keys(obj).some((key) => !(key in dtype))) {
            console.log("予期しないkeyが含まれています。");
            return false;
        }
        // 必要なkeyが含まれているか
        if (Object.keys(dtype).some((key) => !(key in obj))) {
            console.log("keyが不十分です。");
            return false;
        }
        // keyの型チェック
        if (Object.keys(dtype).some((key) => typeof(obj[key]) !== dtype[key])) {
            console.log("keyの型が異なります。");
            return false;
        }
        return true;
    }


    findPosts(req: Request): Promise<Post[]> {
        return this.postInteractor.findPosts();
    }

    findPostById(req: Request): Promise<Post> {
        return this.postInteractor.findPostById(req.params.id);
    }

    createPost(req: Request): Promise<Post> {
        if (! this.isPost(req.body)) return Promise.reject("入力データが正しくありません。");
        else return this.postInteractor.createPost(req.body);
    }

    deletePost(req: Request): Promise<Post[]> {
        return this.postInteractor.deletePost(req.params.id);
    }
}