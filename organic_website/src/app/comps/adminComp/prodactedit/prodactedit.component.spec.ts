import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdacteditComponent } from './prodactedit.component';

describe('ProdacteditComponent', () => {
  let component: ProdacteditComponent;
  let fixture: ComponentFixture<ProdacteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdacteditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdacteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
