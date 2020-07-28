import { TestBed } from '@angular/core/testing';

import { HmsServiceService } from './hms-service.service';

describe('HmsServiceService', () => {
  let service: HmsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HmsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
