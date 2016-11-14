import { Injectable } from '@angular/core';
import { JNFormControl } from '../components/control.component';
import { IJNFormControl } from '../interfaces/form-control.interface';
import { FormControl } from '@angular/forms';

@Injectable()
export class JNTemplateBuilder {

  prepareTemplate(control: IJNFormControl) {
    let type = control.controlType;
    let validators = control.$validators;

    let validatorTemplates = [];
    validatorTemplates = validators.map((validator) => {
      return `<div [hidden]="inputs.hidden" *ngIf="formControl.hasError('${validator.errorName}')">${validator.msg}</div>`;
    });
    return `
      <div [hidden]="inputs.hidden">${type.template}</div>
      ${validatorTemplates.join('\r\n')}
    `;
  }

}
