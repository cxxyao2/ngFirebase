import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  ActivatedRoute,
  ActivatedRouteStub,
  asyncData,
  asyncError,
} from '../../testing';

import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from '../../service/hero';
import { HeroDetailService } from '../hero-detail.service';

//////  Testing Variables  //////
let activatedRoute: ActivatedRouteStub;
let component: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let page: Page;

describe('HeroDetailComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('when override its provided HeroDetailService', overrideSetup);
  describe('with HeroModule setup', heroModuleSetup);
  describe('with FormsModule setup', formsModuleSetup);
});

/////////////////////
function overrideSetup() {
  class HeroDetailServiceSpy {
    testHero: Hero = { id: 42, name: 'Test Hero' };

    /* emit cloned test hero */
    getHero = jasmine
      .createSpy('getHero')
      .and.callFake(() => asyncData(Object.assign({}, this.testHero)));

    /* emit clone of test hero, with changes merged in */
    saveHero = jasmine
      .createSpy('saveHero')
      .and.callFake((hero: Hero) =>
        asyncData(Object.assign(this.testHero, hero))
      );
  }

  // the `id` value is irrelevant because ignored by service stub
  beforeEach(() => activatedRoute.setParamMap({ id: 9999 }));

  beforeEach(
    waitForAsync(() => {
      const routerSpy = createRouterSpy();

      TestBed.configureTestingModule({
        declarations: [HeroDetailComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: Router, useValue: routerSpy },
          // HeroDetailService at this level is irrelevant
          { provide: HeroDetailService, useValue: {} },
        ],
      })
        // override component's own provider
        .overrideComponent(HeroDetailComponent, {
          set: {
            providers: [
              {
                provide: HeroDetailService,
                useClass: HeroDetailServiceSpy,
              },
            ],
          },
        })
        .compileComponents();
    })
  );

  let heroDetailSvrSpy: HeroDetailServiceSpy;
  beforeEach(
    waitForAsync(() => {
      createComponent();
      // get the component's injected HeroDetailServiceSpy
      heroDetailSvrSpy = fixture.debugElement.injector.get(
        HeroDetailService
      ) as any;
    })
  );

  it('should have called `getHero`', () => {
    expect(heroDetailSvrSpy.getHero.calls.count()).toBe(
      1,
      'getHero called once'
    );
  });

  it("should display stub hero's name", () => {
    expect(page.nameDisplay.textContent).toBe(heroDetailSvrSpy.testHero.name);
  });
  it('should save stub hero change', fakeAsync(() => {
    const origName = heroDetailSvrSpy.testHero.name;
    const newName = 'New Name';
    page.nameInput.value = newName;
    page.nameInput.dispatchEvent(new Event('input')); // tell Angular

    expect(component.hero.name).toBe(newName, 'component hero has new name');
    expect(heroDetailSvrSpy.testHero.name).toBe(
      origName,
      'service hero unchanged before save'
    );
    page.saveBtn.click();
    expect(heroDetailSvrSpy.saveHero.calls.count()).toBe(
      1,
      'saveHero called once'
    );
    tick();
    expect(heroDetailSvrSpy.testHero.name).toBe(
      newName,
      'service hero has new name after save'
    );
    expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
  }));
  it('fixture injected service is not the component injected service', () => {
    inject([HeroDetailService], (fixtureService: HeroDetailService) => {
      const componentService = fixture.debugElement.injector.get(
        HeroDetailService
      );
      expect(fixtureService).not.toBe(
        componentService,
        'service injected from fixture'
      );
    });
  });
}
////////////////////
import {
  getTestHeroes,
  TestHeroService,
  HeroService,
} from '../../model-testing';

const firstHero = getTestHeroes()[0];

function heroModuleSetup() {
  beforeEach(
    waitForAsync(() => {
      const routerSpy = createRouterSpy();

      TestBed.configureTestingModule({
        declarations: [HeroDetailComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: HeroService, useClass: TestHeroService },
          {
            provide: Router,
            useValue: routerSpy,
          },
        ],
      }).compileComponents();
    })
  );

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;

    beforeEach(
      waitForAsync(() => {
        expectedHero = firstHero;
        activatedRoute.setParamMap({ id: expectedHero.id });
        createComponent();
      })
    );

    it("should display that hero's name ", () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      page.cancelBtn.click();
      expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('should save when click save but not navigate immediately', () => {
      // Get service injected into component and spy on its `saveHero` method
      // It delegate to fake `HeroService.updateHero` which delivers a safe test result
      const heroDetailSrv = fixture.debugElement.injector.get(
        HeroDetailService
      );
      const saveSpy = spyOn(heroDetailSrv, 'saveHero').and.callThrough();

      page.saveBtn.click();
      expect(saveSpy.calls.any()).toBe(
        true,
        'HeroDeatailService.saveHero called'
      );
      expect(page.navigateSpy.calls.any()).toBe(
        false,
        'router.navigate not called'
      );
    });

    it('should navigate when click save and save resolves ', fakeAsync(() => {
      page.saveBtn.click();
      tick(); // wait for async save to complete
      expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
    }));

    it('should convert hero name to Title Case', () => {
      // get the name's input and display elements from the DOM
      const hostElement = fixture.nativeElement;
      const nameInput: HTMLInputElement = hostElement.querySelector('input');
      const nameDisplay: HTMLElement = hostElement.querySelector('span');

      // simulate user entering a new name into the input box
      nameInput.value = 'quick BROWN fOx';
      nameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(nameDisplay.textContent).toBe('Quick Brown Fox');
    });
  });

  describe('when navigate with no hero id', () => {
    beforeEach(waitForAsync(createComponent));

    it('should have hero.id === 0', () => {
      expect(component.hero.id).toBe(0);
    });

    it('should display empty hero name', () => {
      expect(page.nameDisplay.textContent).toBe('');
    });
  });

  describe('when navigate to non-existent hero id', () => {
    beforeEach(
      waitForAsync(() => {
        activatedRoute.setParamMap({ id: 99999 });
        createComponent();
      })
    );

    it('should try to navigate back to hero list', () => {
      expect(page.gotoListSpy.calls.any()).toBe(
        true,
        'component.gotoList called'
      );
      expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });

  // why we must use `fixture.debugElement.injector` in `Page()`
  it("cannot use `inject` to get component's provided HeroDetailService", () => {
    let service: HeroDetailService;
    fixture = TestBed.createComponent(HeroDetailComponent);
    // Throws because `inject` only has access to TestBed's injector
    // which is an ancestor of the component's injector
    expect(
      inject([HeroDetailService], (hds: HeroDetailService) => (service = hds))
    ).toThrowError(/No provider for HeroDetailService/);

    // get `HeroDetailService` with component's own injector
    service = fixture.debugElement.injector.get(HeroDetailService);
    expect(service).toBeDefined('debugElement.injector');
  });
}

/////////////
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '../../model-testing/title-case.pipe';

function formsModuleSetup() {
  beforeEach(
    waitForAsync(() => {
      const routerSpy = createRouterSpy();

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HeroDetailComponent, TitleCasePipe],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: HeroService, useClass: TestHeroService },
          { provide: Router, useValue: routerSpy },
        ],
      }).compileComponents();
    })
  );

  it(
    "should display 1st hero's name",
    waitForAsync(() => {
      const expectedHero = firstHero;
      activatedRoute.setParamMap({ id: expectedHero.id });
      createComponent().then(() => {
        expect(page.nameDisplay.textContent).toBe(expectedHero.name);
      });
    })
  );
}

///////////

////// Helpers //////

/** Create the HeroDetailComponent, initialize it, set test variables */
function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  component = fixture.componentInstance;
  page = new Page(fixture);

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
  });
}

function createRouterSpy() {
  return jasmine.createSpyObj('Router', ['navigate']);
}

class Page {
  // getter properties wait to query the DOM until called;
  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }

  get saveBtn() {
    return this.buttons[0];
  }

  get cancelBtn() {
    return this.buttons[1];
  }

  get nameDisplay() {
    return this.query<HTMLElement>('span');
  }

  get nameInput() {
    return this.query<HTMLInputElement>('input');
  }

  gotoListSpy: jasmine.Spy;
  navigateSpy: jasmine.Spy;

  constructor(someFixture: ComponentFixture<HeroDetailComponent>) {
    // get the navigate spy from the injected router spy object
    const routerSpy = someFixture.debugElement.injector.get(Router) as any;
    this.navigateSpy = routerSpy.navigate;

    // spy on component's `gotoList()` method
    const someComponent = someFixture.componentInstance;
    this.gotoListSpy = spyOn(someComponent, 'gotoList').and.callThrough();
  }

  /// query helpers
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}
