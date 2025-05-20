import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactDetailsComponent } from './impact-details.component';

describe('ImpactDetailsComponent', () => {
  let component: ImpactDetailsComponent;
  let fixture: ComponentFixture<ImpactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
