import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersLiabilityPpTzaComponent } from './owners-liability-pp-tza.component';

describe('OwnersLiabilityPpTzaComponent', () => {
  let component: OwnersLiabilityPpTzaComponent;
  let fixture: ComponentFixture<OwnersLiabilityPpTzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnersLiabilityPpTzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnersLiabilityPpTzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
