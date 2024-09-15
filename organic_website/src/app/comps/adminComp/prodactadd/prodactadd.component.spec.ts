import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactaddComponent } from './prodactadd.component';

describe('ProdactaddComponent', () => {
  let component: ProdactaddComponent;
  let fixture: ComponentFixture<ProdactaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdactaddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdactaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
