import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, Query, Req } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto, PostQuery } from '@core/dtos';
import { PostService } from '@services/post/post-service.service';
import { ScrapePosts } from '@core/dtos/scrape-posts.dto';

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
  scrape(@Req() req, @Body() body: ScrapePosts) {
    return this.postService.scrape(body.category, req.user.userId);
  }
}
