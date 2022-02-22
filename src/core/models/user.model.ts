import { CreateUserDto } from '../dtos';
import { Post } from './post.model';

export class User {
  id: number;
  name: string;
  password: string;
  email: string;

  constructor(partial?: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
