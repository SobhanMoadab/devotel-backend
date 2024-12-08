import { Result } from 'src/shared/Result';
import * as crypto from 'crypto'

export class Post {
  private constructor(
    private id: string,
    private title: string,
    private content: string,
    private imageUrl: string | null,
    private authorId: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(
    props: Partial<{
      id: string;
      title: string;
      content: string;
      imageUrl: string | null;
      authorId: string;
      createdAt: Date;
      updatedAt: Date;
    }> = {},
  ): Result<Post> {
    const {
      id = crypto.randomUUID(),
      title = '',
      content = '',
      imageUrl = null,
      authorId = '',
      createdAt = new Date(),
      updatedAt = new Date(),
    } = props;

    if (!title.trim()) {
      return Result.fail('Title is required');
    }

    if (!content.trim()) {
      return Result.fail('Content is required');
    }

    return Result.ok(
      new Post(id, title, content, imageUrl, authorId, createdAt, updatedAt),
    );
  }

  // Getter methods
  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getImageUrl(): string | null {
    return this.imageUrl;
  }

  getAuthorId(): string {
    return this.authorId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
