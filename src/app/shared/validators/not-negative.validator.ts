import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notNegativeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') return null;
    return Number(value) < 0 ? { notNegative: true } : null;
  };
}
