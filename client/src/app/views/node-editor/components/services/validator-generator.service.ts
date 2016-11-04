import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { JNFormValidator } from '../entities/validator';
import { IJNEditorFormValidator } from '../../interfaces/validator.interface';

@Injectable()
export class ValidatorGenerator {

  public generate(formValidators: IJNEditorFormValidator[]): Array<JNFormValidator>  {
    let validators: JNFormValidator[] = [];

    formValidators.forEach((formValidator) => {
      let cb = function (fc: FormControl) {
        return new Promise((resolve, reject) => {
          formValidator.validator(fc).then((valid) => {
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
