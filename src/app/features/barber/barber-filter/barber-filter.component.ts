import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { BarberFilterDTO } from '../../../shared/models/barber-filter.dto';

@Component({
  selector: 'app-barber-filter',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    FloatLabel,
    InputTextModule,
    ButtonModule,
    ButtonGroupModule,
  ],
  templateUrl: './barber-filter.component.html',
  styleUrl: './barber-filter.component.scss',
})
export class BarberFilterComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  title: string = 'Filtrar de Barbeiros';
  clearEvent = output<void>();
  searchEvent = output<BarberFilterDTO>();

  ngOnInit(): void {
    this.initForm();
  }

  search() {
    const values: BarberFilterDTO = this.form.value;
    this.searchEvent.emit(values);
  }

  clear() {
    this.form.reset();
    this.clearEvent.emit();
  }

  initForm() {
    this.form = this.fb.group({
      name: [],
      specialtyName: [],
    });
  }
}
