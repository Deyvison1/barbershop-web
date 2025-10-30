import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaircutListComponent } from './haircut-list.component';

describe('HaircutListComponent', () => {
  let component: HaircutListComponent;
  let fixture: ComponentFixture<HaircutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaircutListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaircutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
