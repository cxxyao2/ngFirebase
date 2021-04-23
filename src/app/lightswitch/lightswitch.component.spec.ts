import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightswitchComponent } from './lightswitch.component';

fdescribe('LightswitchComponent', () => {
  let component: LightswitchComponent;
  it('#clicked() should toggle #isOn', () => {
    const comp = new LightswitchComponent();
    expect(comp.isOn).toBe(false, 'off at start');
    comp.clicked();
    expect(comp.isOn).toBe(true, 'on after click');
    comp.clicked();
    expect(comp.isOn).toBe(false, 'off after second click');
  });

  it('#clicked should set #message to "is on"', () => {
    const comp = new LightswitchComponent();
    expect(comp.message).toMatch(/is off/i, 'off at first');
    comp.clicked();
    expect(comp.message).toMatch(/is on/i, 'on after clicked');
  });

  it('#print raised the selected event when clicked', () => {
    const comp = new LightswitchComponent();
    const lightName = 'Erisson';
    comp.lightName = lightName;

    comp.selected.subscribe((lampName: string) =>
      expect(lampName).toBe(lightName)
    );
    comp.print();
  });
});
