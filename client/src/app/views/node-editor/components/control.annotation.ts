import { JNEditorFormControl } from './control.component';
import { Component, Input } from '@angular/core';
import { IJNEditorFormControlInput } from '../interfaces/form-control-input.interface';
import { FormControl } from '@angular/forms';

declare const Reflect: any;


interface IDynamicComponent {
  inputs: IJNEditorFormControlInput;
  formControl: FormControl;
}

export interface IControlOptions {
  template: string;
}

export function JNEditorControl(options: IControlOptions) {
  return function (controlClass: typeof JNEditorFormControl) {
    controlClass.wrappedComponent = createNewComponent(options.template);
  };
}

function createNewComponent (tmpl: string) {
  @Component({
      template: tmpl
  })
  class CustomDynamicComponent  implements IDynamicComponent {
    @Input() public inputs: IJNEditorFormControlInput;
    @Input() public formControl: FormControl;
  };
  // a component for this particular template
  return CustomDynamicComponent;
}
