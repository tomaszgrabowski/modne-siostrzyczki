import { Directive } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  AbstractControl
} from "@angular/forms";

@Directive({
  selector: "[appSizesFied]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: SizesFiedDirective
    }
  ]
})
export class SizesFiedDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    const val = control.value;
    //not empty
    if (!val) {
      return {
        appSizesFied: false
      };
    }
    return null;
  }

  constructor() {}
}
