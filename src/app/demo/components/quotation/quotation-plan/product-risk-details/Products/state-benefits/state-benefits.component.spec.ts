import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateBenefitsComponent } from './state-benefits.component';

describe('StateBenefitsComponent', () => {
  let component: StateBenefitsComponent;
  let fixture: ComponentFixture<StateBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateBenefitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
