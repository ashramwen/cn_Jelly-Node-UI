import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';
import { IJNFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNRadioControl),
    multi: true
};

export interface IRadioInput extends IJNFormControlInput {
  options: Array<IRadioOption>;
}

interface IRadioOption {
  text: string;
  value: string;
}

@JNControl({
  template: `
    <jn-radio 
      [label]="inputs.label" 
      [options]="inputs.options"
      [disabled]="inputs.disabled"
      [formControl]="formControl">
    </jn-radio>
  `
})
@Component({
  selector: 'jn-radio',
  styles: [
    require('./radio.component.scss')
  ],
  template: `
    <md-radio-group [(ngModel)]="value">
      <md-radio-button *ngFor="let d of options" [value]="d.value">
        {{d.text}}
      </md-radio-button>
    </md-radio-group>
  `,
  providers: [VALUE_ACCESSOR]
})
export class JNRadioControl extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected options: Array<IRadioOption>;
}
