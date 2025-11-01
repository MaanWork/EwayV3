import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmCareComponent } from './farm-care.component';

describe('FarmCareComponent', () => {
  let component: FarmCareComponent;
  let fixture: ComponentFixture<FarmCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmCareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
