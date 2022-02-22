import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/core/abstracts/post-repository.abstract';
import { CreatePostDto, UpdatePostDto } from 'src/core/dtos';
import { Post } from 'src/core/models';
import { PostQuery } from 'src/core/types/post-query.type';
import { ScraperService } from './scraper.service';


@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private scraperService: ScraperService
  ) {}

  async create(postDto: CreatePostDto): Promise<Post> {
    const post = new Post(postDto);
    return this.postRepository.create(post);
  }

  async update(id: number, postDto: UpdatePostDto): Promise<Post> {
    const post = new Post(postDto);
    return this.postRepository.update(id, post);
  }

  getAll(query?: PostQuery): Promise<Post[]> {
    return this.postRepository.getAll(query);
  }

  getById(id: number): Promise<Post> {
    return this.postRepository.getById(id);
  }

  delete(id: number) {
    return this.postRepository.delete(id);
  }

  async scrape(category: string): Promise<number>  {
    const scrapedPosts = await this.scraperService.scrapePosts(category);
    const posts = scrapedPosts.map(post => new Post(post));
    return this.postRepository.createMany(posts);
  }
}
