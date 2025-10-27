import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiFlowListComponent } from './api-flow-list.component';

describe('ApiFlowListComponent', () => {
  let component: ApiFlowListComponent;
  let fixture: ComponentFixture<ApiFlowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiFlowListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiFlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
