import { TestBed } from '@angular/core/testing';

import { JwModalService } from './jw-modal.service';

describe('JwModalService', () => {
  let service: JwModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
