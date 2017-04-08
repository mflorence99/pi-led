import { TestBed, inject } from '@angular/core/testing';

import { PinsService } from './pins.service';

describe('PinsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinsService]
    });
  });

  it('should ...', inject([PinsService], (service: PinsService) => {
    expect(service).toBeTruthy();
  }));
});
