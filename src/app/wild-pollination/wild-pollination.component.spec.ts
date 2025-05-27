import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildPollinationComponent } from './wild-pollination.component';

describe('WildPollinationComponent', () => {
  let component: WildPollinationComponent;
  let fixture: ComponentFixture<WildPollinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WildPollinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WildPollinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
