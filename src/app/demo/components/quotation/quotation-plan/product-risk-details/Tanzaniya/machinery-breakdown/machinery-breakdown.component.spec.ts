import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryBreakdownComponent } from './machinery-breakdown.component';

describe('MachineryBreakdownComponent', () => {
  let component: MachineryBreakdownComponent;
  let fixture: ComponentFixture<MachineryBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineryBreakdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MachineryBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
