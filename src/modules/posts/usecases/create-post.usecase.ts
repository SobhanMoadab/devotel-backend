import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePostDTO } from '../dto/create-post.dto';
import { IPostRepository } from '../repo/post.repo.interface';
import { Either, Result, left, right } from 'src/shared/Result';
import { Post } from '../domain/post.entity';

export type CreatePostResult = Either<
  BadRequestException | InternalServerErrorException,
  Result<string>
>;

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject('IPostRepository') private readonly postRepository: IPostRepository,
  ) {}

  async execute(dto: CreatePostDTO, userId: string): Promise<CreatePostResult> {
    try {
      // Validate inputs
      if (!dto.imageUrl) {
        return left(new BadRequestException('Image URL is required'));
      }

      // Create domain entity
      const postOrError = Post.create({
        title: dto.title,
        content: dto.content,
        imageUrl: dto.imageUrl, // Use the file path provided in the DTO
        authorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (postOrError.isFailure) {
        return left(new BadRequestException(postOrError.getError()));
      }

      const post = postOrError.getValue();
      await this.postRepository.save(post);

      return right(Result.ok(post.getId()));
    } catch (err) {
      console.log({err})
      return left(new InternalServerErrorException(err.message));
    }
  }
}
