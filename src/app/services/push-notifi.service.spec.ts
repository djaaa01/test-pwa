import { TestBed } from '@angular/core/testing';

import { PushNotifiService } from './push-notifi.service';

describe('PushNotifiService', () => {
  let service: PushNotifiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushNotifiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
