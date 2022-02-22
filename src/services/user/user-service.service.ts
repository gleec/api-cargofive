import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@core/abstracts/user-repository.abstract';
import { CreateUserDto, UpdateUserDto } from '@core/dtos';
import { User } from '@core/models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userDto: CreateUserDto): Promise<User> {
    const userFound = await this.userRepository.getByEmail(userDto.email);
    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const password = await bcrypt.hash(userDto.password, 10)
    const user = new User({
      ...userDto,
       password
    });
    return this.userRepository.create(user);
  }

  update(id: number, userDto: UpdateUserDto): Promise<User> {
    const user = new User(userDto);
    return this.userRepository.update(id, user);
  }

  getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  getById(id: number): Promise<User> {
    return this.userRepository.getById(id);
  }

  getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
