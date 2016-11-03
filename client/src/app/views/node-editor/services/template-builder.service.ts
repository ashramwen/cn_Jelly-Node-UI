import { Injectable } from '@angular/core';
import { JNFormControl } from '../controls/control.component';
import { IJNFormControl } from '../interfaces/form-control.interface';
import { FormControl } from '@angular/forms';

@Injectable()
export class JNTemplateBuilder {

  prepareTemplate(control: IJNFormControl) {
    let type = control.controlType;
    let validators = control.$validators;

    let validatorTemplates = [];
    validatorTemplates = validators.map((validator) => {
      return `<div *ngIf="formControl.hasError('${validator.errorName}')">${validator.msg}</div>`;
    });
    return `
      <div>${type.template}</div>
      ${validatorTemplates.join('\r\n')}
    `;
  }

}
