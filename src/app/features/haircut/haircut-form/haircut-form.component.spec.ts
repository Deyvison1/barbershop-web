import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaircutFormComponent } from './haircut-form.component';

describe('HaircutFormComponent', () => {
  let component: HaircutFormComponent;
  let fixture: ComponentFixture<HaircutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaircutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaircutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
