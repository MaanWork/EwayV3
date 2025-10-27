import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialPackageComponent } from './commercial-package.component';

describe('CommercialPackageComponent', () => {
  let component: CommercialPackageComponent;
  let fixture: ComponentFixture<CommercialPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommercialPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
