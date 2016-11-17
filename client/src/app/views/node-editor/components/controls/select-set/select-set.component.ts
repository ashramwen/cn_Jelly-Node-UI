import { forwardRef, Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { JNEditorFormControl } from '../../control.component';
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
    <jn-editor-select-set
      [label]="inputs.label" 
      [disabled]="inputs.disabled"
      [set]="inputs.set"
      [formControl]="formControl">
    </jn-editor-select-set>
  `
})
@Component({
  selector: 'jn-editor-select-set',
  styles: [
    require('./select-set.component.scss')
  ],
  template: `
    <div class="jn-form">
      <label>{{label | translate}}</label>
      <div class="jn-form" *ngFor="let r of set">
        <jn-editor-select 
          [label]="r.label" 
          [disabled]="r.disabled || disabled"
          [options]="r.options"
          [(ngModel)]="value[r.fieldName]"
          (selectChange)="selectOnChange(r.fieldName, $event)">
        ></jn-editor-select>
      </div>
    </div>
  `,
  providers: [VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class JNSelectSetControl extends JNEditorFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: string;
  @Input()
  protected set: {
    label: string;
    options: Array<ISelectOption>;
    fieldName: string | number;
    selectedByDefault?: boolean;
    disabled?: boolean;
  }[];

  selectOnChange(fieldName, value) {
    let _self = this;
    setTimeout(() => {
      let fields = Object.keys(_self._value);
      let setFields = _self.set.map(r => r.fieldName);
      fields.forEach((field) => {
        if (!setFields.find(f => f === field)) {
          delete _self._value[field];
        }
      });
      _self.onChange(_self.value);
    });
  }

}
