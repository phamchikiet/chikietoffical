/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ErpComponent } from './erp.component';

describe('ErpComponent', () => {
  let component: ErpComponent;
  let fixture: ComponentFixture<ErpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
