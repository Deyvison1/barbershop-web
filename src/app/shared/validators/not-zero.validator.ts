import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') return null;
    return Number(value) === 0 ? { notZero: true } : null;
  };
}
