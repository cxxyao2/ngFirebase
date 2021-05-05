import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLinkDirectiveStub } from './testing/router-link-directive-stub';

// stub declaration
@Component({ selector: 'app-hwo-to-unsubscribe', template: '' })
class HwoToUnsubscribeComponent {}

@Component({ selector: 'app-herolist', template: '' })
class HerolistComponent {}

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let linkDes: DebugElement[];
  let routerLinks: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HwoToUnsubscribeComponent,
        HerolistComponent,
        RouterOutletStubComponent,
        RouterLinkDirectiveStub,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
      });
  });

  beforeEach(() => {
    fixture.detectChanges(); // trigger initial data binding

    // find DebugElements with an attached  RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map((de) => de.injector.get(RouterLinkDirectiveStub));
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(2, 'should hava 2 routerinks');
    // expect(routerLinks[0].linkParams).toBeUndefined();
    expect(routerLinks[0].linkParams).toBe('/howto');
    expect(routerLinks[1].linkParams).toBe('/herolist');
  });

  it('can click Heroes link in template', () => {
    const heroesLinkDe = linkDes[1]; // heroes link debugElement
    const heroesLink = routerLinks[1]; // heroes link directive

    expect(heroesLink.navigatedTo).toBeNull('should not have navigated yet');

    heroesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(heroesLink.navigatedTo).toBe('/herolist');
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-firebase'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-firebase');
  });
});
