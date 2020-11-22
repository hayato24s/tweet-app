import { IPostUseCase } from "../usecase/PostUseCase";
import { IPostRepository } from "../repository/IPostRepository";
import { inject, injectable } from "inversify";
import { Post } from "../entity/Post";

@injectable()
export class PostInteractor implements IPostUseCase {
    private postRepository: IPostRepository;

    constructor(@inject("PostRepository") postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    findPosts(): Promise<Post[]> {
        return this.postRepository.findPosts();
    }

    findPostById(id: string): Promise<Post> {
        return this.postRepository.findPostById(id);
    }

    createPost(data: {content: string, userId: string}): Promise<Post> {
        return this.postRepository.createPost(data);
    }

    deletePost(id: string): Promise<Post[]> {
        return this.postRepository.deletePost(id);
    }
}