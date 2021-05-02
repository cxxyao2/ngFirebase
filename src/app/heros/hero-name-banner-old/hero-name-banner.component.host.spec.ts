import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HeroNameBannerComponent } from './hero-name-banner.component';

@Component({
  template: `
    <app-hero-name-banner
      [heroName]="newName"
      (selected)="onSelected($event)"
    ></app-hero-name-banner>
  `,
})
class TestHostComponent {
  newName = 'Heracles';
  selectedHeroId = 0;
  onSelected(heroId: number): void {
    this.selectedHeroId = heroId;
  }
}

describe('HeroNameBannerComponent (testhost)', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  let bannerEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroNameBannerComponent, TestHostComponent],
      imports: [ReactiveFormsModule, FormsModule],
    });
    // create TestHostComponent instead of HerolistComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    // find the banner's DebugElement and Element
    bannerEl = fixture.nativeElement.querySelector('.banner');
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display a name ', () => {
    const expectedName = testHost.newName.toUpperCase();
    expect(bannerEl.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    bannerEl.click();
    expect(testHost.selectedHeroId).toBe(123);
  });
});
