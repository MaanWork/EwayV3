import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAsInsurerComponent } from './customer-as-insurer.component';

describe('CustomerAsInsurerComponent', () => {
  let component: CustomerAsInsurerComponent;
  let fixture: ComponentFixture<CustomerAsInsurerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAsInsurerComponent]
    });
    fixture = TestBed.createComponent(CustomerAsInsurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
