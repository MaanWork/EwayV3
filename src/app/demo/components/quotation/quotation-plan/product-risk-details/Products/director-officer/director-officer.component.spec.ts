import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorOfficerComponent } from './director-officer.component';

describe('DirectorOfficerComponent', () => {
  let component: DirectorOfficerComponent;
  let fixture: ComponentFixture<DirectorOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorOfficerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectorOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
