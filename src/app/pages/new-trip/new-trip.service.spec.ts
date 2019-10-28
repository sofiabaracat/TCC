import { TestBed } from '@angular/core/testing';

import { NewTripService } from './new-trip.service';

describe('NewTripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewTripService = TestBed.get(NewTripService);
    expect(service).toBeTruthy();
  });
});
