import { TestBed } from '@angular/core/testing';

import { HabitatService } from './habitat.service';

describe('habitatService', () => {
  let service: HabitatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
