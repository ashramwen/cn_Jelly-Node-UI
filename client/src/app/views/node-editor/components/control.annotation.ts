import { JNEditorFormControl } from './control.component';

declare const Reflect: any;

export function JNEditorControl(options: IControlOptions) {
  return function (controlClass: typeof JNEditorFormControl) {
    controlClass.template = options.template;
  };
}

export interface IControlOptions {
  template: string;
}
