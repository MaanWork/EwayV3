import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateGlassComponent } from './plate-glass.component';

describe('PlateGlassComponent', () => {
  let component: PlateGlassComponent;
  let fixture: ComponentFixture<PlateGlassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlateGlassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlateGlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
