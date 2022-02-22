import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from '@core/dtos/auth.dto';
import { UserService } from '@services/user/user-service.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(authDto: AuthLoginDto) {
    const { email, password } = authDto;
    const user = await this.userService.getByEmail(email);
    const comparePassword = await bcrypt.compare(password, user.password)
    if (!user || !comparePassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(authDto: AuthLoginDto) {
    const user = await this.validateUser(authDto);
    const payload = {
      email: user.email,
      sub: user.id
    }

    return this.jwtService.sign(payload);
  }
  
}
