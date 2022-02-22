import {Injectable } from '@nestjs/common';
import { UserRepository } from '@core/abstracts/user-repository.abstract';
import { User } from '@core/models';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();
    const users = prismaUsers.map((user) => new User(user));
    return users;
  }

  async getById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return new User(user);
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    return user ? new User(user) : null ;
  }

  async create(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return new User(user);
  }

  async createMany(data: User[]): Promise<number> {
    const payload = await this.prisma.user.createMany({ data });
    return payload.count;
  }

  async update(id: number, data: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      data,
      where: { id },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return new User(updatedUser);
  }

  async delete(id: number): Promise<User> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return new User(deletedUser);
  }
}
