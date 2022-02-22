import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@auth/auth.service';
import { AuthLoginDto } from '@core/dtos/auth.dto';
import { config } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthLoginDto, @Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.login(authDto);
    res.cookie(config.cookieKey, accessToken, {
      httpOnly: true,
      maxAge: new Date().getTime() + 60 * 60 * 1000
    });

    return 'OK';
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(config.cookieKey);
    return 'OK';
  }
}
