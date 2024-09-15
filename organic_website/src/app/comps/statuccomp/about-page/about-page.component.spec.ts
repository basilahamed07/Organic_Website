import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPAgeComponent } from './about-page.component';

describe('AboutPAgeComponent', () => {
  let component: AboutPAgeComponent;
  let fixture: ComponentFixture<AboutPAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutPAgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
