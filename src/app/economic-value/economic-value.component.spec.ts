import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicValueComponent } from './economic-value.component';

describe('EconomicValueComponent', () => {
  let component: EconomicValueComponent;
  let fixture: ComponentFixture<EconomicValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomicValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomicValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
