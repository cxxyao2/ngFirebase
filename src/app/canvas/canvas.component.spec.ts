import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';

fdescribe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(() => {
    (window as any).__zone_symbol__FakeAsyncTestMacroTask = [
      {
        source: 'HTMLCanvasElement.toBlob',
        callbackArgs: [{ size: 200 }],
      },
    ];
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CanvasComponent],
      }).compileComponents();
    })
  );

  it('should be able to generate blob data from canvas', fakeAsync(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.blobSize).toBe(0);

    tick();
    expect(component.blobSize).toBeGreaterThan(0);
  }));
});
