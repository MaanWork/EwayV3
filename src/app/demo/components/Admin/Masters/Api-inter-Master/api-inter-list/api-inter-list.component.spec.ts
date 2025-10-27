import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiInterListComponent } from './api-inter-list.component';

describe('ApiInterListComponent', () => {
  let component: ApiInterListComponent;
  let fixture: ComponentFixture<ApiInterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiInterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiInterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
