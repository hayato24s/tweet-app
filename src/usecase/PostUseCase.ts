import { Post } from "../entity/Post";

export interface IPostUseCase {
    findPosts(): Promise<Post[]>;
    findPostById(id: string): Promise<Post>;
    createPost(data: {content: string, userId: string}): Promise<Post>;
    deletePost(id: string): Promise<Post[]>;
}