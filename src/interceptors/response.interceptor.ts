import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const http = context.switchToHttp();
    const { statusCode } = http.getResponse();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: statusCode,
        data
      }))
    );
  }
}
