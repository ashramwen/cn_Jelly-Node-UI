import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { IJNFormValidator } from '../../interfaces/validator';
import { JNFormValidator } from '../entities/validator';

@Injectable()
export class ValidatorGenerator {

  public generate(formValidators: IJNFormValidator[]): Array<JNFormValidator>  {
    let validators: JNFormValidator[] = [];

    formValidators.forEach((formValidator) => {
      let cb = function () {
        return new Promise((resolve, reject) => {
          formValidator.validator().then((valid) => {
            if (valid) {
              resolve(null);
              return;
            }
            resolve({[formValidator.errorName]: true});
          });
        });
      };

      let _validator = new JNFormValidator(formValidator.msg, cb);
      validators.push(_validator);
    });

    return validators;
  }
}
