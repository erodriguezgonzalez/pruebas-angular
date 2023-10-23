import { Directive, Attribute } from '@angular/core';
import { Validator, NG_VALIDATORS } from '@angular/forms';

// CheckPasswordsDirective: ejemplo de directiva extraida de internet
// https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CheckPasswordsDirective, multi: true }]
})

export class CheckPasswordsDirective implements Validator {

  constructor(@Attribute('validateEqual') public comparer: string,
    @Attribute('parent') public parent: string) { }

  validate(c: any): { [key: string]: any } {
    const e = c.root.get(this.comparer);

    if (e && c.value !== e.value && !this.isParent) {
      return { compare: true };
    }

    if (e && c.value === e.value && this.isParent) {
      delete e.errors['compare'];
      if (!Object.keys(e.errors).length) {
        e.setErrors(null);
      }
    }

    if (e && c.value !== e.value && this.isParent) {
      e.setErrors({ compare: true });
    }
  }

  private get isParent() {
    if (!this.parent) {
      return false;
    }
    return this.parent === 'true' ? true : false;
  }
}