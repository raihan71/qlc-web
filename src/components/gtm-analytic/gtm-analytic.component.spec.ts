import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtmAnalyticComponent } from './gtm-analytic.component';

describe('GtmAnalyticComponent', () => {
  let component: GtmAnalyticComponent;
  let fixture: ComponentFixture<GtmAnalyticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GtmAnalyticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtmAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
