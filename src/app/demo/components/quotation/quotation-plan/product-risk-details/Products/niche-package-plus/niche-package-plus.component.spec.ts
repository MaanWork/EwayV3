import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NichePackagePlusComponent } from './niche-package-plus.component';


describe('NichePackagePlusComponent', () => {
  let component: NichePackagePlusComponent;
  let fixture: ComponentFixture<NichePackagePlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NichePackagePlusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NichePackagePlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
