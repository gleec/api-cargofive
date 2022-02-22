import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { UserController } from './controllers/user.controller';
import { PostServiceModule } from './services/post/post-service.module';
import { UserServiceModule } from './services/user/user-service.module';

@Module({
  imports: [UserServiceModule, PostServiceModule],
  controllers: [UserController, PostController],
})
export class AppModule {}
