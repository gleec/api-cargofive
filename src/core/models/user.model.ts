import { Post } from './post.model';

export class User {
  id: number;
  name: string;
  password: string;
  email: string;
  posts: Post[];
}
