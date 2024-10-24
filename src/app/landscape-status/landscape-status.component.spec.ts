import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandscapeStatusComponent } from './landscape-status.component';

describe('LandscapeStatusComponent', () => {
  let component: LandscapeStatusComponent;
  let fixture: ComponentFixture<LandscapeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandscapeStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandscapeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
