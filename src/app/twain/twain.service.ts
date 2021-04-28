import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError, Observer } from 'rxjs';
import {
  map,
  retryWhen,
  switchMap,
  take,
  tap,
  startWith,
  catchError,
  mergeMap,
} from 'rxjs/operators';
import { Quote } from './quote';
import { QUOTES } from './twain.data';

@Injectable({
  providedIn: 'root',
})
export class TwainService {
  constructor(private http: HttpClient) {}
  private nextId = 1;
  private errorMessage = '';

  getQuote() {
    return of(QUOTES);
  }
}
