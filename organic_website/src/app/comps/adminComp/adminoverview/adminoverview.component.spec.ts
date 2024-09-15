import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminoverviewComponent } from './adminoverview.component';

describe('AdminoverviewComponent', () => {
  let component: AdminoverviewComponent;
  let fixture: ComponentFixture<AdminoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminoverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
