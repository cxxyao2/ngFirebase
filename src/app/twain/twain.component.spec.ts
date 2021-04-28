import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import 'zone.js/dist/zone-patch-rxjs-fake-async';

import { TwainComponent } from './twain.component';
import { Quote } from './quote';
import { TwainService } from './twain.service';
import { interval, of, throwError } from 'rxjs';
import { delay, take } from 'rxjs/operators';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let quoteEl: any;
  let testQuotes: Quote[];
  let getQuoteSpy: any;

  beforeEach(async () => {
    testQuotes = [{ id: 0, quote: 'Test Quote' }];
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = twainService.getQuote.and.returnVale(of(testQuotes));

    await TestBed.configureTestingModule({
      declarations: [TwainComponent],
      providers: [{ provide: TwainService, useValue: twainService }],
    }).compileComponents();
    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelect('.twain');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show quote after component initialized', () => {
    fixture.detectChanges(); // onInit();

    // sync spy result show testQuote immediately after init
    expect(quoteEl.textContent).toContain(testQuotes[0].quote);
    expect(getQuoteSpy.calls.any()).toBe(true, 'getQuote called');
  });

  it('should display error when TwainService fails', fakeAsync(() => {
    // tell spy to return an error observable
    getQuoteSpy.and.returnValue(throwError('TwainService test failure'));

    fixture.detectChanges(); // onInit()

    // sync spy errors immediately after init
    tick(); // flush the component's setTimeout();

    fixture.detectChanges(); // update errorMessage with setTimeout()
    expect(component.errorMessage).toMatch(
      /test failure/,
      'should display error'
    );

    expect(quoteEl.textContent).toMatch('...', 'should show placeholder');
  }));

  it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
    let called = false;
    setTimeout(() => {
      called = true;
    }, 100);
    tick(100);
    expect(called).toBe(true);
  }));

  it('should run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }

    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0);
    // the nested timeout will also be triggered
    expect(callback).toHaveBeenCalled();
  }));

  it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }

    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0, { processNewMacroTasksSynchronously: false });
    // the nested timeout will not be triggered
    expect(callback).not.toHaveBeenCalled();
    tick(0);
    expect(callback).toHaveBeenCalled();
  }));

  it('should get Date diff correctly in fakeAsync', fakeAsync(() => {
    const start = Date.now();
    tick(100);
    const end = Date.now();
    expect(end - start).toBe(100);
  }));

  it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
    // need to add `import 'zone.js/dist/zone-patch-rxjs-fake-async'
    // to patch rxjs scheduler
    let result: any;
    result = null;
    of('hello')
      .pipe(delay(1000))
      .subscribe((v) => {
        result = v;
      });

    expect(result).toBeNull();
    tick(1000);
    expect(result).toBe('hello');

    const start = new Date().getTime();
    let dateDiff = 0;
    interval(1000)
      .pipe(take(2))
      .subscribe(() => (dateDiff = new Date().getTime() - start));

    tick(1000);
    expect(dateDiff).toBe(1000);
    tick(1000);
    expect(dateDiff).toBe(2000);
  }));
});
