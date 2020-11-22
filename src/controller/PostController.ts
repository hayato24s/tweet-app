import {NextFunction, Request, Response} from "express";
import {Post} from "../entity/Post";
import { IPostUseCase } from "../usecase/PostUseCase";
import { inject, injectable } from "inversify";

@injectable()
export class PostController {

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


    async findPosts(req: Request): Promise<Post[]> {
        return this.postInteractor.findPosts();
    }

    async findPostById(req: Request): Promise<Post> {
        return this.postInteractor.findPostById(req.params.id);
    }

    async createPost(req: Request): Promise<Post> {
        if (! this.isPost(req.body)) return Promise.reject("入力データが正しくありません。");
        else return this.postInteractor.createPost(req.body);
    }

    async deletePost(req: Request): Promise<Post[]> {
        return this.postInteractor.deletePost(req.params.id);
    }
}