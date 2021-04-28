import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { TwainService } from './twain.service';
import { Observable, of } from 'rxjs';
import { catchError, take, startWith } from 'rxjs/operators';
import { Quote } from './quote';

@Component({
  selector: 'app-twain',
  template: ` <div class="twain">
      <ul>
        <li *ngFor="let quote of quotes$ | async; let i = index">
          {{ i }} &nbsp;{{ quote.id }} &nbsp; {{ quote.quote }}
        </li>
      </ul>
    </div>
    <button (click)="getQuote()">Next quote</button>
    <button (click)="emitWithStart()">startWith</button>
    <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>`,
  styles: [
    `
      .twain {
        font-style: italic;
      }
      .error {
        color: red;
      }
    `,
  ],
})
export class TwainComponent implements OnInit {
  errorMessage!: string;
  quotes$!: Observable<Quote[]>;
  constructor(private tservice: TwainService) {}

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote() {
    this.errorMessage = '';
    this.quotes$ = this.tservice.getQuote().pipe(
      startWith([{ id: 0, quote: 'greate minds are alike' }]),
      take(2),
      catchError((err: any) => {
        setTimeout(() => {
          this.errorMessage = err.message || err.toString();
        }, 1000);
        return of([{ id: 0, quote: '...' }]);
      })
    );
  }
}
