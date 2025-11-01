import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireAlliedPerilsComponent } from './fire-allied-perils.component';

describe('FireAlliedPerilsComponent', () => {
  let component: FireAlliedPerilsComponent;
  let fixture: ComponentFixture<FireAlliedPerilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireAlliedPerilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FireAlliedPerilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
