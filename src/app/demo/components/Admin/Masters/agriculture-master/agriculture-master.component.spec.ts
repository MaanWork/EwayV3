import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureMasterComponent } from './agriculture-master.component';

describe('AgricultureMasterComponent', () => {
  let component: AgricultureMasterComponent;
  let fixture: ComponentFixture<AgricultureMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgricultureMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgricultureMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
