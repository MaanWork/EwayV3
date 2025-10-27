import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoInsuranceDetailsComponent } from './co-insurance-details.component';

describe('CoInsuranceDetailsComponent', () => {
  let component: CoInsuranceDetailsComponent;
  let fixture: ComponentFixture<CoInsuranceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoInsuranceDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoInsuranceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
