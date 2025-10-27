import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionAllRiskComponent } from './construction-all-risk.component';

describe('ConstructionAllRiskComponent', () => {
  let component: ConstructionAllRiskComponent;
  let fixture: ComponentFixture<ConstructionAllRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionAllRiskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstructionAllRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
