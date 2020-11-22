import { Post } from "../entity/Post";
import { Repository } from "typeorm";


export interface IPostRepository {
    postRepository: Repository<Post>;
    findPosts(): Promise<Post[]>;
    findPostById(id: string): Promise<Post>;
    createPost(data: {content: string, userId: string}): Promise<Post>;
    deletePost(id: string): Promise<Post[]>; 
}