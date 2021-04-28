import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HeroNameBannerComponent } from './hero-name-banner.component';

fdescribe('HeroNameBannerComponent', () => {
  let component: HeroNameBannerComponent;
  let fixture: ComponentFixture<HeroNameBannerComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroNameBannerComponent],
      imports: [ReactiveFormsModule, FormsModule],
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

  it('should convert name into title case', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    const nameDisplay: HTMLElement = hostElement.querySelector('span');

    nameInput.value = 'quick Brown ok';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(nameInput.value).toBe('quick Brown ok');
    // expect(nameDisplay.innerHTML).toBeUndefined();
    expect(nameDisplay.textContent).toBe('Quick Brown Ok');
  });
});
