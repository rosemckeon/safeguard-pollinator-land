import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPollinationComponent } from './crop-pollination.component';

describe('CropPollinationComponent', () => {
  let component: CropPollinationComponent;
  let fixture: ComponentFixture< CropPollinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropPollinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropPollinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
