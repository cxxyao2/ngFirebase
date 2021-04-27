import { TestBed } from '@angular/core/testing';

import { CalculationService } from './calculation.service';

fdescribe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two number', () => {
    let result = service.add(2, 3);
    expect(result).toEqual(5);
  });
});
