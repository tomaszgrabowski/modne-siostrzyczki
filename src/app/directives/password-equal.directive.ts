import { Directive, Input } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";

@Directive({
  selector: "[passwordEqual]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordEqualDirective,
      multi: true
    }
  ]
})
export class PasswordEqualDirective implements Validator {
  @Input()
  private password: string;

  validate(control: AbstractControl): ValidationErrors {
    const repeatPass = control.value;
    if (repeatPass !== this.password) {
      return {
        validateEqual: false
      };
    }
    return null;
  }

  constructor() {}
}
