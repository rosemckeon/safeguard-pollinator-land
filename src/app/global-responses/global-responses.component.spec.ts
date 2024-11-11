import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalResponsesComponent } from './global-responses.component';

describe('GlobalResponsesComponent', () => {
  let component: GlobalResponsesComponent;
  let fixture: ComponentFixture<GlobalResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalResponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
