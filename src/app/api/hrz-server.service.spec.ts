import { TestBed } from '@angular/core/testing';

import { HrzServerService } from './hrz-server.service';

describe('HrzServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrzServerService = TestBed.get(HrzServerService);
    expect(service).toBeTruthy();
  });
});
