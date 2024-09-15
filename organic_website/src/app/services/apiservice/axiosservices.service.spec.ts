import { TestBed } from '@angular/core/testing';

import { AxiosservicesService } from './axiosservices.service';

describe('AxiosservicesService', () => {
  let service: AxiosservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxiosservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
