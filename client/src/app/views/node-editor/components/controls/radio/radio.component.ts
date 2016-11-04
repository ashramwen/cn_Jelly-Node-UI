import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNRadioControl),
    multi: true
};

export interface IRadio {
  options: Array<IRadioOption>;
  selectedByDefault?: boolean;
}

interface IRadioOption {
  text: string;
  value: string;
}

@JNControl({
  template: `
    <jn-radio [data]="inputs.data" [label]="inputs.label" [disabled]="inputs.disabled"
      [formControl]="formControl">
    </jn-radio>
  `
})
@Component({
  selector: 'jn-select',
  styles: [
    require('./radio.component.scss')
  ],
  template: require('./radio.component.html'),
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
  protected data: any;
}
