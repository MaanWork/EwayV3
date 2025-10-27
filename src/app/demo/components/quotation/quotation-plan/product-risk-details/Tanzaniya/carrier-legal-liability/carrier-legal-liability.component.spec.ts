import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierLegalLiabilityComponent } from './carrier-legal-liability.component';

describe('CarrierLegalLiabilityComponent', () => {
  let component: CarrierLegalLiabilityComponent;
  let fixture: ComponentFixture<CarrierLegalLiabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrierLegalLiabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrierLegalLiabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
