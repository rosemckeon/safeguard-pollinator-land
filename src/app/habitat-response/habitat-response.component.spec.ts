import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatResponseComponent } from './habitat-response.component';

describe('HabitatResponseComponent', () => {
  let component: HabitatResponseComponent;
  let fixture: ComponentFixture<HabitatResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitatResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitatResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
