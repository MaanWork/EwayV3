/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PensionFundTrusteeComponent } from './Pension-Fund-Trustee.component';

describe('PensionFundTrusteeComponent', () => {
  let component: PensionFundTrusteeComponent;
  let fixture: ComponentFixture<PensionFundTrusteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionFundTrusteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionFundTrusteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
