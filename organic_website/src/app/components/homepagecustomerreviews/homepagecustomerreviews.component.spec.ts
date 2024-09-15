import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagecustomerreviewsComponent } from './homepagecustomerreviews.component';

describe('HomepagecustomerreviewsComponent', () => {
  let component: HomepagecustomerreviewsComponent;
  let fixture: ComponentFixture<HomepagecustomerreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepagecustomerreviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepagecustomerreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
