import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberFormComponent } from './barber-form.component';

describe('BarberFormComponent', () => {
  let component: BarberFormComponent;
  let fixture: ComponentFixture<BarberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarberFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
