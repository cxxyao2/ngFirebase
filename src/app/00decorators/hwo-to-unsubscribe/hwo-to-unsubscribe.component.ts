import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval, Subject } from 'rxjs';
import { first, take, takeUntil, takeWhile } from 'rxjs/operators';

function AutoUnsub() {
  return function (obj: Function) {
    const orig = obj.prototype.ngOnDestroy;
    obj.prototype.ngOnDestroy = function () {
      // tslint:disable-next-line: forin
      for (const prop in this) {
        const property = this[prop];
        if (typeof property.unsubscribe === 'function') {
          property.unsubscribe();
        }
      }
      orig.apply();
    };
  };
}

@Component({
  selector: 'app-hwo-to-unsubscribe',
  template: `<button (click)="unsubscribe()">unsubscribe</button>`,
  styleUrls: ['./hwo-to-unsubscribe.component.css'],
})
@AutoUnsub()
export class HwoToUnsubscribeComponent implements OnInit, OnDestroy {
  // method 1: Subscription Array
  // subscription1!: Subscription;
  // subscription2!: Subscription;
  // subscriptions: Subscription[] = [];
  // constructor() {}
  // ngOnInit(): void {
  //   var obervable = interval(1000);
  //   this.subscription1 = obervable.subscribe((x: any) => console.log(x));
  //   this.subscription2 = obervable.subscribe((x: any) => console.log(x));
  //   this.subscriptions.push(this.subscription1);
  //   this.subscriptions.push(this.subscription2);
  // }
  // ngOnDestroy() {
  //   this.subscriptions.forEach((sub) => sub.unsubscribe());
  // }
  // unsubscribe() {
  //   this.subscriptions.forEach((sub) => sub.unsubscribe());
  // }
  // Method 2: Subscription Add method
  // subscription: Subscription = new Subscription();
  // constructor() {}
  // ngOnInit(): void {
  //   var obervable1 = interval(1000);
  //   var obervable2 = interval(400);
  //   const sub1$ = obervable1.subscribe((x: any) => console.log(x));
  //   const sub2$ = obervable2.subscribe((x: any) => console.log(x));
  //   this.subscription.add(sub1$);
  //   this.subscription.add(sub2$);
  // }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  // unsubscribe() {
  //   //console.log('type of ', typeof this.subscription);
  //   this.subscription.unsubscribe();
  // }
  // method 3:  observable$ | async
  // this.observable$ = interval(1000);
  // method 4:  RxJS take* operation
  // take(n) ??????n???????????????unsubscribe, ????????????????????????????????????
  // takeUntil(notifier)  notifier emits value???, takeUntil emits value?????????
  // takeWhile(predicate)
  // taken(n)
  // subscription$: any;
  // ngOnInit() {
  //   var observable$ = interval(1000);
  //   this.subscription$ = observable$
  //     .pipe(take(1))
  //     .subscribe((x) => console.log(x));
  // }
  // ngOnDestroy() {
  //   this.subscription$.unsubscribe();
  // }
  // unsubscribe(): void {
  //   this.subscription$.unsubscribe();
  // }
  // method 5:  takeUntil
  // ?????????notifier, notifier?????????unsubscribe????????????notifier??????ngOnDestroy???
  // notifier = new Subject();
  // ngOnInit() {
  //   let observable$ = interval(1000);
  //   observable$.pipe(takeUntil(this.notifier)).subscribe((x) => console.log(x));
  // }
  // unsubscribe() {
  //   this.notifier.next(1);
  //   this.notifier.subscribe((x) => console.log('subscriber A', x));
  //   this.notifier.next(2);
  //   this.notifier.subscribe((x) => console.log('subscriber B', x));
  //   this.notifier.next(3);
  // }
  // ngOnDestroy() {
  //   this.notifier.next();
  //   this.notifier.complete();
  // }
  // method takeWhite
  // notifier = new Subject();
  // ngOnInit() {
  //   let observable$ = interval(1000);
  //   observable$
  //     .pipe(takeWhile((value) => value < 10))
  //     .subscribe((x) => console.log(x));
  // }
  // unsubscribe() {}
  // ngOnDestroy() {}

  // method first
  // observable$: any;
  // ngOnInit() {
  //   this.observable$ = interval(1000);
  //   // ok this.observable$.pipe(first()).subscribe((x) => console.log(x));  // only output one number: 0
  //   this.observable$
  //     .pipe(first((x) => x === 10))
  //     .subscribe((x) => console.log(x)); //  only output  one number: 10
  // }
  // unsubscribe() {}

  // ?????????????????????????????????????????????ngOnDestroy????????? unsubscribe
  // ???????????????decorater??? ?????????unsubscribe ??????observable

  // method 1: Subscription Array
  subscription1!: Subscription;
  subscription2!: Subscription;
  constructor() {}
  ngOnInit(): void {
    const obervable = interval(1000);
    this.subscription1 = obervable.subscribe((x: any) => console.log(x));
    this.subscription2 = obervable.subscribe((x: any) => console.log(x));
  }
  unsubscribe() {}
  ngOnDestroy() {}
}
