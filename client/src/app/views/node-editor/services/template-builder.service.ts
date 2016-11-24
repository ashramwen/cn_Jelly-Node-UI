import { Injectable } from '@angular/core';
import { IJNFormControl } from '../interfaces/form-control.interface';
import { FormControl } from '@angular/forms';
import { JNEditorFormControl } from '../components/control.component';

@Injectable()
export class JNTemplateBuilder {

  prepareTemplate(control: typeof JNEditorFormControl) {
    return `
      <div [hidden]="inputs.hidden">${control.template}</div>
    `;
  }

}
