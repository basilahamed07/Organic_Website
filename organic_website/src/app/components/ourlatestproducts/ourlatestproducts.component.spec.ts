import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurlatestproductsComponent } from './ourlatestproducts.component';

describe('OurlatestproductsComponent', () => {
  let component: OurlatestproductsComponent;
  let fixture: ComponentFixture<OurlatestproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurlatestproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurlatestproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
