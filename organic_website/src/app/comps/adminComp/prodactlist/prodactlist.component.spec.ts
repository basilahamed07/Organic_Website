import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactlistComponent } from './prodactlist.component';

describe('ProdactlistComponent', () => {
  let component: ProdactlistComponent;
  let fixture: ComponentFixture<ProdactlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdactlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
