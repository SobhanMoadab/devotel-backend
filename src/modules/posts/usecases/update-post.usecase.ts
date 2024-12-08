import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Either, Result, left, right } from 'src/shared/Result';
import { IPostRepository } from '../repo/post.repo.interface';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { Post } from '../domain/post.entity';

export type UpdatePostResult = Either<
  BadRequestException | NotFoundException | InternalServerErrorException,
  Result<void>
>;

@Injectable()
export class UpdatePostUseCase {
  constructor(
    @Inject('IPostRepository') private readonly postRepository: IPostRepository,
  ) {}

  async execute(postId: string, dto: UpdatePostDTO): Promise<UpdatePostResult> {
    try {
      // Fetch the existing post by ID
      const post = await this.postRepository.getById(postId);

      if (!post) {
        return left(new NotFoundException(`Post with id: ${postId} not found`));
      }

      // Use the new image URL if provided, otherwise keep the old one
      const imageUrl = dto.imageUrl || post.getImageUrl();

      // Create a new Post instance using updated or existing data
      const updatedOrError = Post.create({
        id: post.getId(),
        title: dto.title || post.getTitle(),
        content: dto.content || post.getContent(),
        imageUrl, // Use the updated or existing image URL
        authorId: post.getAuthorId(),
        createdAt: post.getCreatedAt(),
        updatedAt: new Date(),
      });

      if (updatedOrError.isFailure) {
        return left(new BadRequestException(updatedOrError.getError()));
      }

      await this.postRepository.save(updatedOrError.getValue());

      return right(Result.ok<void>());
    } catch (error) {
      return left(
        new InternalServerErrorException(
          'An error occurred while updating the post',
        ),
      );
    }
  }
}
