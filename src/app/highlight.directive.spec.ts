import { HighlightDirective } from './highlight.directive';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <h2 appHighlight="yellow" style="backgroundColor:'yellow'">
      Something Yellow
    </h2>
    <h2 appHighlight defaultColor="Gray">The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [appHighlight]="box.value" value="cyan" />
  `,
})
class TestComponent {}

fdescribe('HighlightDirective', () => {
  let des: any;
  let bareH2: any;
  let fixture: any;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // the h2 without the HighlightDirective
    bareH2 = fixture.debugElement.query(By.css('h2:not([appHighlight])'));
  });

  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st<h2> background "yellow" ', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd<h2> background default color', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('', 'to be default color');
  });

  it('should bind <input> background  to value color', () => {
    const input = des[2].nativeElement as HTMLInputElement;
    // expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');

    // input.value = 'green';
    input.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('cyan', 'changed backgroundColor');
  });

  it('bare <h2> should not have a appHighlight', () => {
    expect(bareH2.properties.appHighlight).toBeUndefined(
      ' no appHighlight property'
    );
  });
});
