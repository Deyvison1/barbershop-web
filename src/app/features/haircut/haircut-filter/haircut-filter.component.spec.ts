import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaircutFilterComponent } from './haircut-filter.component';

describe('HaircutFilterComponent', () => {
  let component: HaircutFilterComponent;
  let fixture: ComponentFixture<HaircutFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaircutFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaircutFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
