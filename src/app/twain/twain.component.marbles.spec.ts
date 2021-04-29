import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import 'zone.js/dist/zone-patch-rxjs-fake-async';
import { cold, getTestScheduler } from 'jasmine-marbles';

import { asyncData, asyncError } from '../testing/async-observable-helpers';

import { TwainComponent } from './twain.component';
import { Quote } from './quote';
import { TwainService } from './twain.service';
import { interval, of, throwError } from 'rxjs';
import { delay, last, take } from 'rxjs/operators';

fdescribe('TwainComponent (marbles) ', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let quoteEl: HTMLElement;
  let testQuotes: Quote[];
  let getQuoteSpy: jasmine.Spy;

  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
    testQuotes = [{ id: 0, quote: 'Test Quote' }];
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = twainService.getQuote;

    TestBed.configureTestingModule({
      declarations: [TwainComponent],
      providers: [{ provide: TwainService, useValue: twainService }],
    });
    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  // A synchronous test that simulated async behavior
  it('should show quote after getQuote (marbles)', () => {
    // observable test quote value and complete(), after delay
    const q$ = cold('---x|', { x: testQuotes });
    getQuoteSpy.and.returnValue(q$);

    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).toContain(
      'great minds',
      'should show placeholder'
    );

    getTestScheduler().flush();

    fixture.detectChanges();
    expect(quoteEl.textContent).toContain(
      testQuotes[0].quote,
      'should show quote'
    );

    expect(errorMessage()).toBeNull('should not show error');
  });

  // still need fakeAsync() because of component's setTimeout()
  it('should display error when TwainService fails', fakeAsync(() => {
    // observable error after delay
    const q$ = cold('---#|', null, new Error('TwainService test failure'));
    getQuoteSpy.and.returnValue(q$);

    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).toContain(
      'great mind',
      'should show placeholder after init'
    );

    getTestScheduler().flush();
    tick(1000); // component shows error after a setTimeout(),must be as long as setting in component
    fixture.detectChanges();

    expect(errorMessage()).toMatch(/test failure/, 'should display error');
    expect(quoteEl.textContent).toContain(
      '...',
      'should show placeholder after error'
    );
  }));
});
