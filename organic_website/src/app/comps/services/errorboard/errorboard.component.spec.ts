import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorboardComponent } from './errorboard.component';

describe('ErrorboardComponent', () => {
  let component: ErrorboardComponent;
  let fixture: ComponentFixture<ErrorboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
