import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLiabilityComponent } from './public-liability.component';

describe('PublicLiabilityComponent', () => {
  let component: PublicLiabilityComponent;
  let fixture: ComponentFixture<PublicLiabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLiabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicLiabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
