import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AestheticValuesComponent } from './aesthetic-values.component';

describe('AestheticValuesComponent', () => {
  let component: AestheticValuesComponent;
  let fixture: ComponentFixture<AestheticValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AestheticValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AestheticValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
