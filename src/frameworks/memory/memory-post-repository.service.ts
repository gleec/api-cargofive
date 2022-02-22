import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/core/abstracts/post-repository.abstract';
import { Post } from 'src/core/models';

@Injectable()
export class MemoryPostRepositoryService implements PostRepository {
  posts: Post[] = [];
  currentId = 1;

  getAll(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      resolve(this.posts);
    });
  }

  getById(id: number): Promise<Post> {
    const post = this.posts.find((post) => post.id === id);
    return new Promise((resolve, reject) => {
      resolve(post);
    });
  }

  create(post: Post): Promise<Post> {
    post.id = this.currentId;
    this.posts.push(post);
    this.currentId++;
    return new Promise((resolve, reject) => {
      resolve(post);
    });
  }

  createMany(posts: Post[]): Promise<number> {
    posts.forEach(post => {
      this.create(post);
    })

    return new Promise((resolve, reject) => {
      resolve(posts.length);
    });
  }

  update(id: number, newPost: Post): Promise<Post> {
    let post = this.posts.find((post) => post.id === id);
    const index = this.posts.indexOf(post)
    if (index > -1) {
      post = {
        ...post, 
        ...newPost
      }
      this.posts.splice(index, 1, post);
    }
    return new Promise((resolve, reject) => {
      resolve(post);
    });

  }

  delete(id: number): Promise<Post> {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index > -1) {
      this.posts.splice(index, 1);
    }
    
    return new Promise((resolve) => {
      resolve(this.posts[index]);
    })
  }
}
