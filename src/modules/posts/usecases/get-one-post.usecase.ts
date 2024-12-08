import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IPostRepository } from '../repo/post.repo.interface';
import { Either, Result, left, right } from 'src/shared/Result';
import { Post } from '../domain/post.entity';

export type GetOnePostResult = Either<
  NotFoundException | InternalServerErrorException,
  Result<Post>
>;

@Injectable()
export class GetOnePostUseCase {
  constructor(@Inject('IPostRepository') private readonly postRepository: IPostRepository) {}

  async execute(postId: string): Promise<GetOnePostResult> {
    try {
      const post = await this.postRepository.getById(postId);
      if (!post) {
        return left(new NotFoundException(`Post with id: ${postId} not found`));
      }
      return right(Result.ok(post));
    } catch (err) {
      return left(new InternalServerErrorException('Error fetching post'));
    }
  }
}
