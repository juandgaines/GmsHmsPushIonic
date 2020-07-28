import { TestBed } from '@angular/core/testing';

import { GmsServiceService } from './gms-service.service';

describe('GmsServiceService', () => {
  let service: GmsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GmsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
