/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodocategoryService } from './todocategory.service';

describe('Service: Todocategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodocategoryService]
    });
  });

  it('should ...', inject([TodocategoryService], (service: TodocategoryService) => {
    expect(service).toBeTruthy();
  }));
});
