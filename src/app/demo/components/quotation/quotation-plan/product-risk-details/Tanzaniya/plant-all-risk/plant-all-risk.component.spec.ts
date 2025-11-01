import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantAllRiskComponent } from './plant-all-risk.component';

describe('PlantAllRiskComponent', () => {
  let component: PlantAllRiskComponent;
  let fixture: ComponentFixture<PlantAllRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantAllRiskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantAllRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
