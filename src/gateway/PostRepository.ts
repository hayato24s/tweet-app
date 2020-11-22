import { getRepository } from "typeorm";
import { IPostRepository } from "../repository/IPostRepository";
import { Post } from "../entity/Post";
import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import { resolve } from "url";
import { validate, validateOrReject, ValidationError } from "class-validator";

@injectable()
export class PostRepository implements IPostRepository {

    postRepository: Repository<Post> = getRepository(Post);

    async findPosts(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async findPostById(id: string): Promise<Post> {
        const post = await this.postRepository.findOne({id: id}); // 該当するpostがない時、findOneはresolveでundefinedと返す。
        if (post) return post;
        else return Promise.reject("該当する投稿がありません。");
    }

    async createPost(data: {content: string, userId: string}): Promise<Post> {
        return new Promise(async (resolve, reject) => {
            const post = new Post();
            Object.keys(data).forEach((key) => {
                post[key] = data[key];
            })
            const errors: ValidationError[] = await validate(post);
            if (errors.length > 0) {
                reject(errors);
                return;
            }
            this.postRepository.save(post).then((res) => {
                resolve(res);
            }).catch((err) => {
                if (err["errno"] === 1452) {
                    reject("userIdに合致するユーザーが見つかりませんでした。");
                }
            })
        })
    }

    async deletePost(id: string): Promise<Post[]> {
        const post = await this.findPostById(id); // async処理の場合はrejectが出た瞬間にreturnされる。
        await this.postRepository.remove(post).catch((err) => {
            Promise.reject(err);
        })
        return this.findPosts();
    }
}