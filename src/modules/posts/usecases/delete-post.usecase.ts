import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IPostRepository } from '../repo/post.repo.interface';
import { Either, Result, left, right } from 'src/shared/Result';

export type DeletePostResult = Either<
  NotFoundException | InternalServerErrorException,
  Result<void>
>;

@Injectable()
export class DeletePostUseCase {
  constructor(
    @Inject('IPostRepository') private readonly postRepository: IPostRepository,
  ) {}

  async execute(postId: string): Promise<DeletePostResult> {
    try {
      const post = await this.postRepository.getById(postId);

      if (!post) {
        return left(new NotFoundException(`Post with id: ${postId} not found`));
      }

      await this.postRepository.delete(postId);

      return right(Result.ok());
    } catch (err) {
      return left(new InternalServerErrorException('Error deleting post'));
    }
  }
}
