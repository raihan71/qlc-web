import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenewsComponent } from './sidenews.component';

describe('SidenewsComponent', () => {
  let component: SidenewsComponent;
  let fixture: ComponentFixture<SidenewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
