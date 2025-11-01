import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPlusComponent } from './personal-plus.component';

describe('PersonalPlusComponent', () => {
  let component: PersonalPlusComponent;
  let fixture: ComponentFixture<PersonalPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalPlusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
