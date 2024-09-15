import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDenaiComponent } from './access-denai.component';

describe('AccessDenaiComponent', () => {
  let component: AccessDenaiComponent;
  let fixture: ComponentFixture<AccessDenaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessDenaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessDenaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
