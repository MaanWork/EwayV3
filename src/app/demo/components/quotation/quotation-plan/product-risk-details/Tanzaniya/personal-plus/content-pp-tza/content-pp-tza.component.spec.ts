import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPpTzaComponent } from './content-pp-tza.component';

describe('ContentPpTzaComponent', () => {
  let component: ContentPpTzaComponent;
  let fixture: ComponentFixture<ContentPpTzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPpTzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPpTzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
