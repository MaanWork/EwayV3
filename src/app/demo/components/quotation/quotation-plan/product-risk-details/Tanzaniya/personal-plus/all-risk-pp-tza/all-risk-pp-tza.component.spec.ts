import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRiskPpTzaComponent } from './all-risk-pp-tza.component';

describe('AllRiskPpTzaComponent', () => {
  let component: AllRiskPpTzaComponent;
  let fixture: ComponentFixture<AllRiskPpTzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRiskPpTzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRiskPpTzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
