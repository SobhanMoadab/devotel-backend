import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { FirebaseConfigService } from './modules/posts/infra/firebase/firebase.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up global pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Generate test JWT tokens for roles (no signup/login required for simplicity)
  // This approach allows API testers to quickly get authenticated tokens
  // without setting up a frontend or interacting with Firebase signup/login flows.
  const firebaseService = app.get(FirebaseConfigService);
  const testUsers = [
    {
      email: 'veiledassassin99@gmail.com',
      password: 'Admin123!',
      roles: ['ADMIN'],
    },
    { email: 'editor@example.com', password: 'Editor123!', roles: ['EDITOR'] },
    { email: 'user@example.com', password: 'User123!', roles: ['USER'] },
  ];
  const tokens = await Promise.all(
    testUsers.map((user) =>
      firebaseService.createUserAndGenerateIdToken(
        user.email,
        user.password,
        user.roles,
      ),
    ),
  );
  console.log('Generated Test Tokens:', tokens);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
