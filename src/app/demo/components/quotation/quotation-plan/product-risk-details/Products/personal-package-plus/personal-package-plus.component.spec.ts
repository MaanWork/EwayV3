import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalPackagePlusComponent } from './personal-package-plus.component';


describe('PersonalPackagePlusComponent', () => {
  let component: PersonalPackagePlusComponent;
  let fixture: ComponentFixture<PersonalPackagePlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalPackagePlusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalPackagePlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
