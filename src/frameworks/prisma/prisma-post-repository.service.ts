import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Post } from '@core/models';
import { PostRepository } from '@core/abstracts/post-repository.abstract';
import { PostQuery } from '@core/dtos';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(query?: PostQuery): Promise<Post[]> {
    const prismaPost = await this.prisma.post.findMany({
      where: {
        category: query?.category,
        authorId: {
          equals: query?.author
        }
      }
    });
    const posts = prismaPost.map((post) => new Post(post));
    return posts;
  }

  async getById(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      rejectOnNotFound: true,
      where: { id }
    });

    return new Post(post);
  }

  async create(data: Post): Promise<Post> {
    const prismaData: Prisma.PostCreateInput = {
      ...data,
      author: {
        connect: {
          id: data.author
        }
      }
    };
    const post = await this.prisma.post.create({
      data: prismaData
    });

    return new Post(post);
  }

  async createMany(data: Post[]): Promise<number> {
    const prismaData: Prisma.PostCreateManyInput[] = data.map((post) => {
      const { author: authorId, title, category, description, publishedAt, source } = post;
      return {
        authorId,
        title,
        category,
        description,
        publishedAt,
        source
      };
    });
    const payload = await this.prisma.post.createMany({ data: prismaData });
    return payload.count;
  }

  async update(id: number, data: Post): Promise<Post> {
    const prismaData: Prisma.PostCreateInput = {
      ...data,
      author: {
        connect: {
          id: data.author
        }
      }
    };
    const updatedPost = await this.prisma.post.update({
      data: prismaData,
      where: { id }
    });
    return new Post(updatedPost);
  }

  async delete(id: number): Promise<Post> {
    const deletedPost = await this.prisma.post.delete({
      where: { id }
    });
    return new Post(deletedPost);
  }
}
