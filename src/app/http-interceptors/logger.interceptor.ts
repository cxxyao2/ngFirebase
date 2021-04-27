import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, startWith } from 'rxjs/operators';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.headers.set('Authorization', 'auth-token-111222');
    this.logger.info(`Calling API: ${req.url}`);
    return next.handle(req).pipe(
      tap(
        (data: HttpEvent<any>) => {
          this.logger.success(`Call to the API ${req.url} succeeded`);
        },
        (error: HttpErrorResponse) => {
          this.logger.error(
            `Call to the API ${req.url} failed with ${error.status}`
          );
        }
      )
    );
  }
}
