import { Post } from '../domain/post.entity';

export interface IPostRepository {
  save(post: Post): Promise<void>;
  getPosts(skip: number, limit: number): Promise<Post[]>;
  getById(id: string): Promise<Post | null>;
  delete(id: string): Promise<void>;
}