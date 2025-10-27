import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRiskDetailsComponent } from './product-risk-details.component';

describe('ProductRiskDetailsComponent', () => {
  let component: ProductRiskDetailsComponent;
  let fixture: ComponentFixture<ProductRiskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRiskDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRiskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
