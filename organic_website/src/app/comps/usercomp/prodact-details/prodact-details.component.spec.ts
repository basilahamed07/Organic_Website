import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactDetailsComponent } from './prodact-details.component';

describe('ProdactDetailsComponent', () => {
  let component: ProdactDetailsComponent;
  let fixture: ComponentFixture<ProdactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdactDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
