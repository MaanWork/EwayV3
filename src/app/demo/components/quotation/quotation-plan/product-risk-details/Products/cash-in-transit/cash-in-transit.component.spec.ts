import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInTransitComponent } from './cash-in-transit.component';

describe('CashInTransitComponent', () => {
  let component: CashInTransitComponent;
  let fixture: ComponentFixture<CashInTransitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashInTransitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashInTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
