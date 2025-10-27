import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicEquipmentComponent } from './electronic-equipment.component';

describe('ElectronicEquipmentComponent', () => {
  let component: ElectronicEquipmentComponent;
  let fixture: ComponentFixture<ElectronicEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicEquipmentComponent]
    });
    fixture = TestBed.createComponent(ElectronicEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
