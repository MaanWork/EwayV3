/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HouseHoldersComponent } from './house-holders.component';

describe('HouseHoldersComponent', () => {
  let component: HouseHoldersComponent;
  let fixture: ComponentFixture<HouseHoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseHoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseHoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
