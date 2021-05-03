import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HwoToUnsubscribeComponent } from './hwo-to-unsubscribe.component';

describe('HwoToUnsubscribeComponent', () => {
  let component: HwoToUnsubscribeComponent;
  let fixture: ComponentFixture<HwoToUnsubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HwoToUnsubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HwoToUnsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
