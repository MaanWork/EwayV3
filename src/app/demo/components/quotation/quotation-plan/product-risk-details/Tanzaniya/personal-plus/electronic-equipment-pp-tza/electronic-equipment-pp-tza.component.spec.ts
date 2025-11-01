import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicEquipmentPpTzaComponent } from './electronic-equipment-pp-tza.component';

describe('ElectronicEquipmentPpTzaComponent', () => {
  let component: ElectronicEquipmentPpTzaComponent;
  let fixture: ComponentFixture<ElectronicEquipmentPpTzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectronicEquipmentPpTzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectronicEquipmentPpTzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
