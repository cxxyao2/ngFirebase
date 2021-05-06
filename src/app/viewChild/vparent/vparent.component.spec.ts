import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VparentComponent } from './vparent.component';

describe('VparentComponent', () => {
  let component: VparentComponent;
  let fixture: ComponentFixture<VparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VparentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
