import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsInTransitComponent } from './goods-in-transit.component';

describe('GoodsInTransitComponent', () => {
  let component: GoodsInTransitComponent;
  let fixture: ComponentFixture<GoodsInTransitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsInTransitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsInTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
