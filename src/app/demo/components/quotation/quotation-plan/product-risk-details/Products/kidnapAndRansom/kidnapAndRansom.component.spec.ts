/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KidnapAndRansomComponent } from './kidnapAndRansom.component';

describe('KidnapAndRansomComponent', () => {
  let component: KidnapAndRansomComponent;
  let fixture: ComponentFixture<KidnapAndRansomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidnapAndRansomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidnapAndRansomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
