import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErectionAllRiskComponent } from './erection-all-risk.component';

describe('ErectionAllRiskComponent', () => {
  let component: ErectionAllRiskComponent;
  let fixture: ComponentFixture<ErectionAllRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErectionAllRiskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErectionAllRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
