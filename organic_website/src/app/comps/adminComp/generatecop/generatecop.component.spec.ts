import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratecopComponent } from './generatecop.component';

describe('GeneratecopComponent', () => {
  let component: GeneratecopComponent;
  let fixture: ComponentFixture<GeneratecopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratecopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratecopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
