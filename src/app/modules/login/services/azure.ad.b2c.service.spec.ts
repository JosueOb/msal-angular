import { TestBed } from '@angular/core/testing';

import { AzureAdB2CService } from './azure.ad.b2c.service';

describe('AzureAdB2CService', () => {
  let service: AzureAdB2CService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureAdB2CService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
