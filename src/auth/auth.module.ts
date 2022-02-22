import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserServiceModule } from '@services/user/user-service.module';
import { config } from 'src/config';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    UserServiceModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn }
    })
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
