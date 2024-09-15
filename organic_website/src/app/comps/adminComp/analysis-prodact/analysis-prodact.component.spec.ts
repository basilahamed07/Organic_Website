import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisProdactComponent } from './analysis-prodact.component';

describe('AnalysisProdactComponent', () => {
  let component: AnalysisProdactComponent;
  let fixture: ComponentFixture<AnalysisProdactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalysisProdactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisProdactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
