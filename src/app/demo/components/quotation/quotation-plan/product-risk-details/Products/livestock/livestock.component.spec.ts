/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LivestockComponent } from './livestock.component';

describe('LivestockComponent', () => {
  let component: LivestockComponent;
  let fixture: ComponentFixture<LivestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
