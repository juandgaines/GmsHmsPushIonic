import { TestBed } from '@angular/core/testing';

import { CheckXMSProviderService } from './check-xmsprovider.service';

describe('CheckXMSProviderService', () => {
  let service: CheckXMSProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckXMSProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
