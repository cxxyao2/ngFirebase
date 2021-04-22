import { Component, OnInit } from '@angular/core';
import { of, Observable, interval, from, timer } from 'rxjs';
import { concatAll, map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit {
  myColor = 'blue';
  condition = false;
  salary = 0;
  subscribe!: any;
  message$!: Observable<string>;
  concat$!: Observable<any>;
  private messages = [
    'You are my hero',
    'You ar the best hero',
    'Will you continue to be my hero?',
  ];

  constructor() {
    this.resend();
  }

  resend() {
    this.message$ = interval(500).pipe(
      map((i) => this.messages[i]),
      take(this.messages.length)
    );
  }

  ngOnInit(): void {}

  concatAllTest() {
    const source = interval(1000);
    const example = source.pipe(
      map((val) => of(val + 10)),
      concatAll()
    );
    this.subscribe = example.subscribe((val) => {
      console.log('Example with Basic Observable:', val);
    });
  }

  unsubscribe() {
    this.subscribe.unsubscribe();
  }

  concatAllTest2() {
    const source = interval(1000);
    this.concat$ = source.pipe(
      switchMap((val) => of(val + 10))
      // 效果等于
      // map((val)=>of(val));
      //concatAll();
    );
  }
}
