import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const WHITELIST = [
  '/api/users/signup',
  '/api/auth/login'
];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    if (WHITELIST.includes(req.url)) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(_, user, exception) {
    if (!user) {
      throw new UnauthorizedException(exception);
    }
    return user;
  }
}
