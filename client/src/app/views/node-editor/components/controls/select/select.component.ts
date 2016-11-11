import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';
import { IJNFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNSelectControl),
    multi: true
};

export interface ISelectInput extends IJNFormControlInput{
  options: Array<ISelectOption>;
  selectedByDefault?: boolean;
}

interface ISelectOption {
  text: string;
  value: string;
}

@JNControl({
  template: `
    <jn-select 
      [label]="inputs.label" 
      [disabled]="inputs.disabled"
      [options]="inputs.options"
      [formControl]="formControl">
    </jn-select>
  `
})
@Component({
  selector: 'jn-select',
  styles: [
    require('./select.component.scss')
  ],
  template: `
    <div class="jn-form inline">
      <label class="jn-form-label">{{label | translate}}</label>
      <div class="jn-form-control">
        <select 
          [(ngModel)]="value"
          [disabled]="disabled">
          <option *ngFor="let o of options" [value]="o.value">{{o.text}}</option>
        </select>
      </div>
    </div>
  `,
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
  @Input()
  protected options: ISelectOption;
}
