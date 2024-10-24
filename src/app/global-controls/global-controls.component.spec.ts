import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalControlsComponent } from './global-controls.component';

describe('GlobalControlsComponent', () => {
  let component: GlobalControlsComponent;
  let fixture: ComponentFixture<GlobalControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
