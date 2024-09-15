import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScroolComponent } from './scrool.component';

describe('ScroolComponent', () => {
  let component: ScroolComponent;
  let fixture: ComponentFixture<ScroolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScroolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScroolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
