import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CreatePostUseCase } from './usecases/create-post.usecase';
import { UpdatePostUseCase } from './usecases/update-post.usecase';
import { PrismaPostRepository } from './repo/post.repo.prisma';
import { GetPostsUseCase } from './usecases/get-posts.usecase';
import { DeletePostUseCase } from './usecases/delete-post.usecase';
import { GetOnePostUseCase } from './usecases/get-one-post.usecase';
import { PostController } from './post.controller';
import { FirebaseConfigService } from 'src/modules/posts/infra/firebase/firebase.config';
import { FirebaseAuthGuard } from 'src/modules/posts/infra/firebase/firebase.guard';
import { MulterConfigService } from 'src/shared/multer-config.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
    MulterModule.registerAsync({
      useClass: MulterConfigService, 
    }),
  ],
  providers: [
    FirebaseConfigService,
    FirebaseAuthGuard,
    PrismaService,
    MulterConfigService,
    {
      provide: 'IPostRepository',
      useClass: PrismaPostRepository,
    },
    CreatePostUseCase,
    GetPostsUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,
    GetOnePostUseCase, // Add all use cases here
  ],
  controllers: [PostController],
  exports: [
    PrismaService,
    'IPostRepository',
    CreatePostUseCase,
    GetPostsUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,
    GetOnePostUseCase,
  ],
})
export class PostModule {}
