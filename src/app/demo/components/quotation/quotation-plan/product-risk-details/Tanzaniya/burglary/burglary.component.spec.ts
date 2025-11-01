import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurglaryComponent } from './burglary.component';

describe('BurglaryComponent', () => {
  let component: BurglaryComponent;
  let fixture: ComponentFixture<BurglaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurglaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurglaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
