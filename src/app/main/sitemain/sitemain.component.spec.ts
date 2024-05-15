import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemainComponent } from './sitemain.component';

describe('SitemainComponent', () => {
  let component: SitemainComponent;
  let fixture: ComponentFixture<SitemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitemainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
