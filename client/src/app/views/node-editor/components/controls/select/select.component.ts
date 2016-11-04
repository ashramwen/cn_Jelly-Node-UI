import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNSelectControl),
    multi: true
};

export interface ISelectData {
  options: Array<ISelectOption>;
  selectedByDefault?: boolean;
}

interface ISelectOption {
  text: string;
  value: string;
}

@JNControl({
  template: `
    <jn-select [data]="inputs.data" [label]="inputs.label" [disabled]="inputs.disabled"
      [formControl]="formControl">
    </jn-select>
  `
})
@Component({
  selector: 'jn-select',
  styles: [
    require('./select.component.scss')
  ],
  template: require('./select.component.html'),
  providers: [VALUE_ACCESSOR]
})
export class JNSelectControl extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected data: any;
}
