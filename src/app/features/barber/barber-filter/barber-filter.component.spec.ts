import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberFilterComponent } from './barber-filter.component';

describe('BarberFilterComponent', () => {
  let component: BarberFilterComponent;
  let fixture: ComponentFixture<BarberFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarberFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
