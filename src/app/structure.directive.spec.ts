import { StructureDirective } from './structure.directive';
import { Component, Directive, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <button (click)="condition = !condition">toggle</button>
    <div>
      <h2 id="h2A" *appStructure="condition">A is displayed</h2>
      <h2 id="h2B" *appStructure="!condition">B is displayed</h2>
    </div>
  `,
})
class TestComponent {
  condition = false;
}

fdescribe('StructureDirective', () => {
  let des: any;
  let fixture: any;
  let comp: any;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [StructureDirective, TestComponent],
    }).createComponent(TestComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    // all elements with an attached Structural directive
    des = fixture.debugElement.queryAllNodes(By.directive(StructureDirective));
  });

  it('should have two structural elements', () => {
    expect(des.length).toBe(2);
  });

  it('should display "A is displayed" after created', () => {
    const divDe = fixture.debugElement.query(By.css('div'));
    const divEl = divDe.nativeElement as HTMLDivElement;
    expect(divEl.innerHTML).toContain('A is displayed');
    expect(divEl.innerHTML).not.toContain(
      'B is displayed',
      'B should not be displayed when created'
    );
  });

  it('should display B after clicking the toggle button ', () => {
    let toggleButton = fixture.debugElement.query(By.css('button'));
    toggleButton = toggleButton.nativeElement as HTMLButtonElement;

    toggleButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const divDe = fixture.debugElement.query(By.css('div'));
    const divEl = divDe.nativeElement as HTMLDivElement;
    expect(divEl.innerHTML).toContain('B is displayed');
    // expect(des[1].textContent).toContain('B');
  });

  it('should have a condition true after clicking the toggle button ', () => {
    let toggleButton = fixture.debugElement.query(By.css('button'));
    toggleButton = toggleButton.nativeElement as HTMLButtonElement;

    toggleButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(comp.condition).toBeTrue();
    // expect(des[1].textContent).toContain('B');
  });
});
