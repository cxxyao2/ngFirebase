import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';

import { HeroNameBannerComponent } from './hero-name-banner.component';

fdescribe('HeroNameBannerComponent', () => {
  let component: HeroNameBannerComponent;
  let fixture: ComponentFixture<HeroNameBannerComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroNameBannerComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroNameBannerComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(h1.textContent).toContain(component.title);
  });

  it('should still see original title after comp.title change', () => {
    const oldTitle = component.title;
    component.title = 'Test title';
    expect(h1.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectchanges', () => {
    component.title = 'Test title';
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title);
  });
});
