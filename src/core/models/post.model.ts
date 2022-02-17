import { User } from './user.model';

export class Post {
  id: number;
  title: string;
  published: Date;
  author: User;
  source: string;
  category: string;
  description: string;
}
