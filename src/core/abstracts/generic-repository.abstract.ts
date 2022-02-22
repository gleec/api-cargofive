export abstract class GenericRepository<T> {
  abstract getAll(query?: any): Promise<T[]>;
  abstract getById(id: number): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract createMany(items: T[]): Promise<number>;
  abstract update(id: number, item: T): Promise<T>;
  abstract delete(id: number): Promise<T>;
} 