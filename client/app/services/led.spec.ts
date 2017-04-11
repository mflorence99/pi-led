import { TestBed, inject } from '@angular/core/testing';

import { LEDService } from './led';

describe('LEDService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LEDService]
    });
  });

  it('should ...', inject([LEDService], (service: LEDService) => {
    expect(service).toBeTruthy();
  }));
});
