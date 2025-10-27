/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomsAndTransitBondComponent } from './customs-and-transit-bond.component';

describe('CustomsAndTransitBondComponent', () => {
  let component: CustomsAndTransitBondComponent;
  let fixture: ComponentFixture<CustomsAndTransitBondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomsAndTransitBondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsAndTransitBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
