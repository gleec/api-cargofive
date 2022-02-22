import { Post } from '../models';
import { GenericRepository } from './generic-repository.abstract';

export abstract class PostRepository extends GenericRepository<Post> {}