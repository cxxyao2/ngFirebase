import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

import { HerolistComponent } from './herolist.component';
import { HighlightDirective } from '../../highlight.directive';

let component: HerolistComponent;
let fixture: ComponentFixture<HerolistComponent>;
let page: Page;

const HEROES = [
  { id: 1, name: 'Denise' },
  { id: 2, name: 'Mike' },
];
// 2021 May 03. unit test ok
fdescribe('HerolistComponent', () => {
  beforeEach(
    waitForAsync(() => {
      const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

      TestBed.configureTestingModule({
        declarations: [HerolistComponent, HighlightDirective],
        providers: [{ provide: Router, useValue: routerSpy }],
      })
        .compileComponents()
        .then(createComponent);
    })
  );

  it('should display heroes', () => {
    expect(page.heroRows.length).toBeGreaterThan(0);
  });

  it('1st hero should match 1st test hero', () => {
    const expectedHero = HEROES[0];
    const actualHero = page.heroRows[0].textContent;
    expect(actualHero).toContain(expectedHero.id.toString(), 'hero.id');
    expect(actualHero).toContain(expectedHero.name, 'hero.name');
  });

  it('should select hero on click', fakeAsync(() => {
    const expectedHero = HEROES[1];
    const li = page.heroRows[1];

    li.dispatchEvent(new Event('click'));
    tick();
    expect(component.selectedHero).toEqual(expectedHero);
  }));

  it('should navigate to selected hero detail on click', fakeAsync(() => {
    const expectedHero = HEROES[1];
    const li = page.heroRows[1];

    li.dispatchEvent(new Event('click'));
    tick();

    expect(page.navSpy.calls.any()).toBe(true, 'navigate called');
    const navArgs = page.navSpy.calls.first().args[0];
    expect(navArgs).toBe(
      '/hero/' + expectedHero.id,
      'should navigate to the second hero'
    );
    // this.router.navigate(['/hero',id])
    // expect(navArgs[0]).toContain('hero', 'nav to hero URL');
    // expect(navArgs[1]).toBe(expectedHero.id, 'expected hero.id');
  }));

  it('should find `HighlightDirective` with `By.directive`', () => {
    const h2 = fixture.debugElement.query(By.css('h2'));
    const directive = fixture.debugElement.query(
      By.directive(HighlightDirective)
    );
    expect(h2).toEqual(directive);
  });

  it('should color header with `HighlightDirective`', () => {
    const h2 = page.highLightDe.nativeElement as HTMLElement;

    // input.value = 'green';
    h2.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const bgColor = h2.style.backgroundColor;

    const isExpectedColor = bgColor === 'gold' || bgColor === 'rgb(255,215,0)';
    expect(bgColor).toBe('gold', 'backgroundColor');
  });

  it("the `HighlightDirective` is among the element's providers", () => {
    expect(page.highLightDe.providerTokens).toContain(
      HighlightDirective,
      'HighlightDirective'
    );
  });
});

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(HerolistComponent);
  component = fixture.componentInstance;

  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}
class Page {
  heroRows!: HTMLLIElement[];

  highLightDe!: DebugElement;

  /* Spy on router navigate method */
  navSpy!: jasmine.Spy;

  constructor() {
    const heroRowNodes = fixture.nativeElement.querySelectorAll('li');
    this.heroRows = Array.from(heroRowNodes);

    // Find the first element with an attached HighLightDirective
    this.highLightDe = fixture.debugElement.query(
      By.directive(HighlightDirective)
    );

    // Get the component's injected router navigation spy
    const routerSpy = fixture.debugElement.injector.get(Router);
    this.navSpy = routerSpy.navigateByUrl as jasmine.Spy;
  }
}
