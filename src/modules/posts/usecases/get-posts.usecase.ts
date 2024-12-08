import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IPostRepository } from '../repo/post.repo.interface';
import { Either, Result, left, right } from 'src/shared/Result';
import { Post } from '../domain/post.entity';
import { GetPostsDTO } from '../dto/get-posts.dto';

export type GetPostsResult = Either<
  InternalServerErrorException,
  Result<Post[]>
>;

@Injectable()
export class GetPostsUseCase {
  constructor(@Inject('IPostRepository') private readonly postRepository: IPostRepository) {}

  async execute(dto: GetPostsDTO): Promise<GetPostsResult> {
    try {
      const { skip = 0, limit = 10 } = dto;
      const posts = await this.postRepository.getPosts(skip, limit);
      return right(Result.ok(posts));
    } catch (err) {
      return left(new InternalServerErrorException('Error fetching posts'));
    }
  }
}
