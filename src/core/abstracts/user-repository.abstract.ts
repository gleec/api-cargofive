import { User } from '../models';
import { GenericRepository } from './generic-repository.abstract';

export abstract class UserRepository extends GenericRepository<User> {
  abstract getByEmail(email: string): Promise<User>;
}