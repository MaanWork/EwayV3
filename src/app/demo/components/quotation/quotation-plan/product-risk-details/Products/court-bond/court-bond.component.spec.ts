/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CourtBondComponent } from './court-bond.component';

describe('CourtBondComponent', () => {
  let component: CourtBondComponent;
  let fixture: ComponentFixture<CourtBondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtBondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
