import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersLiabilityComponent } from './employers-liability.component';

describe('EmployersLiabilityComponent', () => {
  let component: EmployersLiabilityComponent;
  let fixture: ComponentFixture<EmployersLiabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployersLiabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployersLiabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
