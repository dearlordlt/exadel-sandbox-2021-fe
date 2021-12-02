import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
import 'moment-timezone';

export class DateValidators {
  static sameDate(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      // Use moment lib to trim the time part from the date
      if (control.get(dateField1)?.value !== '' && control.get(dateField2)?.value !== '') {
        const date1 = moment(control.get(dateField1)?.value).format(moment.HTML5_FMT.DATE);
        const date2 = moment(control.get(dateField2)?.value).format(moment.HTML5_FMT.DATE);
        if (date1 !== '' && date2 !== '' && date1 === date2) {
          return validatorField;
        }
      }

      return null;
    };
  }
}

// Custom ErrorStateMatcher which returns true (error exists) when the control has been dirtied and the parent form group is invalid
export class SameDateErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (control) return control!.dirty && control!.parent!.invalid;
    else return false;
  }
}
