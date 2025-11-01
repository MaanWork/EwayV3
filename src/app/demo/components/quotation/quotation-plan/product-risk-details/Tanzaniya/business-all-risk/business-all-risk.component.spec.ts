import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAllRiskComponent } from './business-all-risk.component';

describe('BusinessAllRiskComponent', () => {
  let component: BusinessAllRiskComponent;
  let fixture: ComponentFixture<BusinessAllRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessAllRiskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessAllRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
