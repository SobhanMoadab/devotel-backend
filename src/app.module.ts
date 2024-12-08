import { Module } from '@nestjs/common';
import { PostModule } from './modules/posts/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './shared/multer-config.service';

@Module({
  imports: [
    PostModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [],
  providers: [
    MulterConfigService,
    // Other providers
  ],
})
export class AppModule {}
