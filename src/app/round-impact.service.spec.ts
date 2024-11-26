import { TestBed } from '@angular/core/testing';

import { RoundImpactService } from './round-impact.service';

describe('RoundImpactService', () => {
  let service: RoundImpactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundImpactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
