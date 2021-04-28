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

import { LoggerInterceptor } from './logger.interceptor';
import { LoggerService } from '../logger.service';

fdescribe('LoggerInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let mockLoggerSvc: any;
  let httpClient: HttpClient;
  const baseUrl = 'http://localhost:5000/api';

  beforeEach(() => {
    mockLoggerSvc = {
      info: jasmine.createSpy('info'),
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoggerInterceptor,
          multi: true,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerSvc,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should log a message when an API is called', () => {
    httpClient.get('api/orders').subscribe();
    const req = httpTestingController.expectOne('api/orders');
    req.flush([]);

    expect(mockLoggerSvc.info).toHaveBeenCalled();
    expect(mockLoggerSvc.info).toHaveBeenCalledWith('Calling API: api/orders');

    expect(req.request.headers.get('Authorization')).toBeDefined(
      'headers include Authorization'
    );
  });

  it('should log a success message when the API call is successful', () => {
    httpClient.get('api/orders').subscribe();

    const req = httpTestingController.expectOne('api/orders');
    req.flush([]);

    expect(mockLoggerSvc.success).toHaveBeenCalled();
    expect(mockLoggerSvc.success).toHaveBeenCalledWith(
      'Call to the API api/orders succeeded'
    );
  });

  it('should log an error message when the API call failed', () => {
    httpClient.get('api/orders').subscribe();

    const req = httpTestingController.expectOne('api/orders');

    const errorEvent = new ErrorEvent('bad url', {
      message: '404 error',
      filename: 'logger.service.ts',
      lineno: 12,
      colno: 12,
    });

    req.error(errorEvent);

    expect(mockLoggerSvc.error).toHaveBeenCalled();
    expect(mockLoggerSvc.error).toHaveBeenCalledWith(
      'Call to the API api/orders failed with 0'
    );
  });
});
