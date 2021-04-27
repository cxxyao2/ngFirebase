import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';

fdescribe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should have a header including auth token', () => {
    httpClient.get('api/orders').subscribe();

    const req = httpTestingController.expectOne('api/orders');
    req.flush([]);

    expect(req.request.headers.get('x-auth-token')).toEqual(
      'my-auth-token-is-long-and-security'
    );
  });
});
