import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/abstracts/user-repository.abstract';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { User } from 'src/core/models';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  signUp(userDto: CreateUserDto): Promise<User> {
    const userFound = this.userRepository.getByEmail(userDto.email);
    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const user = new User(userDto);
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


  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
