import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureFormComponent } from './agriculture-form.component';

describe('AgricultureFormComponent', () => {
  let component: AgricultureFormComponent;
  let fixture: ComponentFixture<AgricultureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultureFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgricultureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
