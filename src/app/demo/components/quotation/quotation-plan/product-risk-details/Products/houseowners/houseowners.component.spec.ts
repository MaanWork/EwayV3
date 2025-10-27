import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseownersComponent } from './houseowners.component';

describe('HouseownersComponent', () => {
  let component: HouseownersComponent;
  let fixture: ComponentFixture<HouseownersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseownersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseownersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
