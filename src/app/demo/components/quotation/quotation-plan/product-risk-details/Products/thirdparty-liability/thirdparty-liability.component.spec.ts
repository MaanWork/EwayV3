import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdpartyLiabilityComponent } from './thirdparty-liability.component';

describe('ThirdpartyLiabilityComponent', () => {
  let component: ThirdpartyLiabilityComponent;
  let fixture: ComponentFixture<ThirdpartyLiabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdpartyLiabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdpartyLiabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
