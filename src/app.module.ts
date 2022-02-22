import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { PostController } from './controllers/post.controller';
import { UserController } from './controllers/user.controller';
import { PostServiceModule } from './services/post/post-service.module';
import { UserServiceModule } from './services/user/user-service.module';

@Module({
  imports: [UserServiceModule, PostServiceModule,  AuthModule],
  controllers: [UserController, PostController, AuthController],
})
export class AppModule {}
