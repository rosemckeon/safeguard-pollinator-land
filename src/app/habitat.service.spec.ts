import { TestBed } from '@angular/core/testing';

import { habitatService } from './habitat.service';

describe('habitatService', () => {
  let service: habitatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(habitatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
