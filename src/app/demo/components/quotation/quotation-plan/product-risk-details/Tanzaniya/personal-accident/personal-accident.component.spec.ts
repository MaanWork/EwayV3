import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAccidentComponent } from './personal-accident.component';

describe('PersonalAccidentComponent', () => {
  let component: PersonalAccidentComponent;
  let fixture: ComponentFixture<PersonalAccidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalAccidentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
