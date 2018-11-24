import { Directive } from '@angular/core';
import { Validator, ValidationErrors, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[zipNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ZipNumberDirective,
      multi: true
    }
  ]
})
export class ZipNumberDirective implements Validator {
  validate(control:AbstractControl): ValidationErrors {
    const valid: boolean = (/\d{2}-\d{3}/).test(control.value);
    if(!valid){
      return{
        zipNumber: false
      }
    }
    return null
  }

  constructor() { }

}
