import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ButtonClickEvents } from 'src/app/testing';

import { HerolistComponent } from './herolist.component';

describe('HerolistComponent', () => {
  let component: HerolistComponent;
  let fixture: ComponentFixture<HerolistComponent>;

  beforeEach(() => {});

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [HerolistComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    fixture = TestBed.createComponent(HerolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should tell Router to navigate when button clicked', () => {
    buttonClick(); // trigger click on first button

    // args passed to router.navigateByUrl() spy
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().arg[0];

    const id = component.heros[0].id;
    expect(navArgs).toBe(
      '/hero/' + id,
      'should nav to HeroComponent for first hero'
    );
  });
});
