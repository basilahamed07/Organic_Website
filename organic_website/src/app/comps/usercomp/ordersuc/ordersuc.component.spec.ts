import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersucComponent } from './ordersuc.component';

describe('OrdersucComponent', () => {
  let component: OrdersucComponent;
  let fixture: ComponentFixture<OrdersucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
