import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidTenderBondComponent } from './bid-tender-bond.component';

describe('BidTenderBondComponent', () => {
  let component: BidTenderBondComponent;
  let fixture: ComponentFixture<BidTenderBondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidTenderBondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BidTenderBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
