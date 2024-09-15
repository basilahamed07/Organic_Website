import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagetitleComponent } from './homepagetitle.component';

describe('HomepagetitleComponent', () => {
  let component: HomepagetitleComponent;
  let fixture: ComponentFixture<HomepagetitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepagetitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepagetitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
