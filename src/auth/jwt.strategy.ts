import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        if(!req || !req.cookies) return null;
        return req.cookies[config.cookieKey]
      },
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}