import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Post } from '../domain/post.entity';
import { IPostRepository } from './post.repo.interface';

@Injectable()
export class PrismaPostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Handles both create and update using save
  async save(post: Post): Promise<void> {
    const existingPost = await this.prisma.post.findUnique({
      where: { id: post.getId() },
    });

    if (existingPost) {
      // Update operation
      await this.prisma.post.update({
        where: { id: post.getId() },
        data: {
          title: post.getTitle() || existingPost.title,
          content: post.getContent() || existingPost.content,
          imageUrl: post.getImageUrl() || existingPost.imageUrl,
          authorId: post.getAuthorId() || existingPost.authorId,
          createdAt: existingPost.createdAt, // Preserve original creation date
          updatedAt: post.getUpdatedAt() || new Date(),
        },
      });
    } else {
      // Create operation
      await this.prisma.post.create({
        data: {
          id: post.getId(), // Ensure the ID is included for consistency
          title: post.getTitle(),
          content: post.getContent(),
          imageUrl: post.getImageUrl(),
          authorId: post.getAuthorId(),
          createdAt: post.getCreatedAt(),
          updatedAt: post.getUpdatedAt(),
        },
      });
    }
  }

  // Fetch paginated posts
  async getPosts(skip: number, limit: number): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((postData) =>
      Post.create({
        id: postData.id,
        title: postData.title,
        content: postData.content,
        imageUrl: postData.imageUrl,
        authorId: postData.authorId,
        createdAt: postData.createdAt,
        updatedAt: postData.updatedAt,
      }).getValue(),
    );
  }

  // Fetch total count of posts
  async getTotalCount(): Promise<number> {
    return this.prisma.post.count();
  }

  async getById(id: string): Promise<Post | null> {
    const postData = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!postData) return null;

    const postOrError = Post.create({
      id: postData.id,
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
      authorId: postData.authorId,
      createdAt: postData.createdAt,
      updatedAt: postData.updatedAt,
    });
    return postOrError.isSuccess ? postOrError.getValue() : null;
  }

  async update(id: string, updatedPost: Partial<Post>): Promise<void> {
    await this.prisma.post.update({
      where: { id },
      data: {
        ...updatedPost,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    });
  }
}
