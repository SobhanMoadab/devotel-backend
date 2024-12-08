import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Either, Result } from 'src/shared/Result';
import { FirebaseAuthGuard } from 'src/modules/posts/infra/firebase/firebase.guard';
import { GetUser, UserPayload } from 'src/modules/posts/infra/firebase/get-user.decorator';
import {
  RoleGuard,
  Roles,
  UserRole,
} from 'src/modules/posts/infra/firebase/roles.decorator';
import { CreatePostDTO } from './dto/create-post.dto';
import { CreatePostUseCase } from './usecases/create-post.usecase';
import { UpdatePostDTO } from './dto/update-post.dto';
import { GetPostsDTO } from './dto/get-posts.dto';
import { GetPostsUseCase } from './usecases/get-posts.usecase';
import { GetOnePostUseCase } from './usecases/get-one-post.usecase';
import { UpdatePostUseCase } from './usecases/update-post.usecase';
import { DeletePostUseCase } from './usecases/delete-post.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('api/posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getPostsUseCase: GetPostsUseCase,
    private readonly getOnePostUseCase: GetOnePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
  ) {}

  @Post()
  @UseGuards(FirebaseAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Res() res: Response,
    @Body() dto: CreatePostDTO,
    @GetUser() user: UserPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return res.status(400).json({
        status: 'error',
        message: 'Image is required.',
      });
    }

    // Add the uploaded file path to the DTO
    dto.imageUrl = `/uploads/${file.filename}`;

    const result = await this.createPostUseCase.execute(dto, user.uid);
    return this.handleResult(res, result, HttpStatus.CREATED, {
      message: 'Post created successfully',
    });
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async getPosts(@Res() res: Response, @Query() dto: GetPostsDTO) {
    const result = await this.getPostsUseCase.execute(dto);
    return this.handleResult(res, result);
  }

  @Get(':postId')
  @UseGuards(FirebaseAuthGuard)
  async getOnePost(@Res() res: Response, @Param('postId') postId: string) {
    const result = await this.getOnePostUseCase.execute(postId);
    return this.handleResult(res, result);
  }

  @Patch(':postId')
  @UseGuards(FirebaseAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @UseInterceptors(FileInterceptor('image'))
  async updatePost(
    @Res() res: Response,
    @Param('postId') postId: string,
    @Body() dto: UpdatePostDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // Add the uploaded file path to the DTO if a new file is uploaded
    if (file) {
      dto.imageUrl = `/uploads/${file.filename}`;
    }

    const result = await this.updatePostUseCase.execute(postId, dto);
    return this.handleResult(res, result, HttpStatus.OK, {
      message: 'Post updated successfully',
    });
  }

  @Delete(':postId')
  @UseGuards(FirebaseAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deletePost(@Res() res: Response, @Param('postId') postId: string) {
    const result = await this.deletePostUseCase.execute(postId);
    return this.handleResult(res, result, HttpStatus.OK, {
      message: 'Post deleted successfully',
    });
  }

  private handleResult(
    res: Response,
    result: Either<Error, Result<any>>,
    successStatus = HttpStatus.OK,
    additionalData = {},
  ) {
    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case NotFoundException:
          return res.status(HttpStatus.NOT_FOUND).json({
            status: 'error',
            message: error.message,
          });
        case BadRequestException:
          return res.status(HttpStatus.BAD_REQUEST).json({
            status: 'error',
            message: error.message,
          });
        default:
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'An unexpected error occurred.',
          });
      }
    }

    return res.status(successStatus).json({
      status: 'success',
      ...additionalData,
      ...(result.value.getValue() ? { data: result.value.getValue() } : {}),
    });
  }
}
