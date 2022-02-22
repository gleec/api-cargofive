import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { UserService } from 'src/services/user/user-service.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  signUp(@Body() user: CreateUserDto) {
    return this.userService.signUp(user);
  }

  @Put(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getById(id);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.delete(id);
  }
}
