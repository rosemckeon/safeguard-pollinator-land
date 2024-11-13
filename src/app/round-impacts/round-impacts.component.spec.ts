import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundImpactsComponent } from './round-impacts.component';

describe('RoundImpactsComponent', () => {
  let component: RoundImpactsComponent;
  let fixture: ComponentFixture<RoundImpactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundImpactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundImpactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
