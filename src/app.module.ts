import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, UsersService, PostsService],
})
export class AppModule {}
