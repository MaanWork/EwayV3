import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentalDamageComponent } from './accidental-damage.component';

describe('AccidentalDamageComponent', () => {
  let component: AccidentalDamageComponent;
  let fixture: ComponentFixture<AccidentalDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentalDamageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccidentalDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
