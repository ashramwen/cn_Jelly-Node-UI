import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';
import { IJNFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNSelectSetControl),
    multi: true
};

export interface ISelectSetInput extends IJNFormControlInput {
  set: {
    label: string;
    options: Array<ISelectOption>;
    fieldName: string | number;
    selectedByDefault?: boolean;
    disabled?: boolean;
  }[];
}

interface ISelectOption {
  text: string;
  value: string;
}

@JNControl({
  template: `
    <jn-select-set
      [label]="inputs.label" 
      [disabled]="inputs.disabled"
      [set]="inputs.set"
      [formControl]="formControl">
    </jn-select-set>
  `
})
@Component({
  selector: 'jn-select-set',
  styles: [
    require('./select-set.component.scss')
  ],
  template: `
    <div class="jn-form">
      <label>{{label | translate}}</label>
      <div class="jn-form" *ngFor="let r of set">
        <label>{{r.label | translate}}</label>
        <select
          (ngModelChange)="selectOnChange(r.fieldName, $event)"
          [(ngModel)]="value[r.fieldName]"
          [disabled]="r.disabled">
          <option *ngFor="let o of r.options" [value]="o.value">{{o.text}}</option>
        </select>
      </div>
    </div>
  `,
  providers: [VALUE_ACCESSOR]
})
export class JNSelectSetControl extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: string;
  @Input()
  protected set: ISelectSetInput;

  selectOnChange(fieldName, value) {
    setTimeout(() => {
      this.onChange(this.value);
    });
  }

}
