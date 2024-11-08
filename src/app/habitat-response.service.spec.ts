import { TestBed } from '@angular/core/testing';

import { HabitatResponseService } from './habitat-response.service';

describe('HabitatResponseService', () => {
  let service: HabitatResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitatResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
