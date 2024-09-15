import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopondComponent } from './copond.component';

describe('CopondComponent', () => {
  let component: CopondComponent;
  let fixture: ComponentFixture<CopondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
