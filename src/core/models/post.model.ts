import { CreatePostDto } from '../dtos';

export class Post {
  id: number;
  title: string;
  published: Date | string;
  author: number;
  source: string;
  category: string;
  description: string;

  constructor(partial?: Partial<CreatePostDto>) {
    Object.assign(this, partial);
  }
}
