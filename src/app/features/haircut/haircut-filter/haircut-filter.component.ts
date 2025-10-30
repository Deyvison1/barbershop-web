import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { HaircutFilterDTO } from '../../../shared/models/haircut-filter.dto';
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
  selector: 'app-haircut-filter',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    FloatLabel,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    DatePickerModule,
    ButtonGroupModule
  ],
  templateUrl: './haircut-filter.component.html',
  styleUrl: './haircut-filter.component.scss',
})
export class HaircutFilterComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  title: string = 'Filtros de Cortes';
  searchEvent = output<HaircutFilterDTO>();
  clearEvent = output<void>();

  ngOnInit(): void {
    this.initForm();
  }

  clear() {
    this.form.reset();
    this.clearEvent.emit();
  }

  search() {
    let values: HaircutFilterDTO = this.form.value;
    if(values.createdDate) {
      let date = new Date(values.createdDate);
      values.createdDate = date.toISOString();
    }
    this.searchEvent.emit(values);
  }

  private initForm() {
    this.form = this.fb.group({
      name: [''],
      createdDate: [],
      price: [],
      time: [],
    });
  }
}
