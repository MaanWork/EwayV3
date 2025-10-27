import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelguaranteeComponent } from './fuelguarantee.component';

describe('FuelguranteeComponent', () => {
  let component: FuelguaranteeComponent;
  let fixture: ComponentFixture<FuelguaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelguaranteeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuelguaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
