import { TestBed } from '@angular/core/testing';

import { GlobalChangesService } from './global-changes.service';

describe('GlobalChangesService', () => {
  let service: GlobalChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
