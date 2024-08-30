/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuanlyduanService } from './quanlyduan.service';

describe('Service: Quanlyduan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuanlyduanService]
    });
  });

  it('should ...', inject([QuanlyduanService], (service: QuanlyduanService) => {
    expect(service).toBeTruthy();
  }));
});
