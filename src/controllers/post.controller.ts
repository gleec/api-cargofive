import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from 'src/core/dtos';
import { PostQuery } from 'src/core/types/post-query.type';
import { PostService } from 'src/services/post/post-service.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  create(@Body() post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Put(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Get()
  getAll(@Query() query?: PostQuery) {
    return this.postService.getAll(query);
  }

  @Get(':id')
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.getById(id);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.delete(id);
  }

  @Post('scrape')
  scrape(category: string) {
    return this.postService.scrape(category);
  }
}
