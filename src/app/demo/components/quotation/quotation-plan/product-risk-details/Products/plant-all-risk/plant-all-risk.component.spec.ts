/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlantAllRiskComponent } from './plant-all-risk.component';

describe('PlantAllRiskComponent', () => {
  let component: PlantAllRiskComponent;
  let fixture: ComponentFixture<PlantAllRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantAllRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantAllRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
