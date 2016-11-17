import { forwardRef, Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { JNEditorFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';
import { IJNFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNSelectControl),
    multi: true
};

export interface ISelectInput extends IJNFormControlInput {
  options: Array<ISelectOption>;
  selectedByDefault?: boolean;
}

interface ISelectOption {
  text: string;
  value: string;
}

@JNControl({
  template: `
    <jn-editor-select 
      [label]="inputs.label" 
      [disabled]="inputs.disabled"
      [options]="inputs.options"
      [formControl]="formControl">
    </jn-editor-select>
  `
})
@Component({
  selector: 'jn-editor-select',
  styles: [
    require('./select.component.scss')
  ],
  template: `
    <div class="jn-form inline">
      <label class="jn-form-label">{{label | translate}}</label>
      <div class="jn-form-control">
        <jn-select [(ngModel)]="value" (selectionChanged)="selectionChanged($event)" [options]="options">
        </jn-select>
      </div>
    </div>
  `,
  providers: [VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class JNSelectControl extends JNEditorFormControl {
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
  @Output() selectChange: EventEmitter<any> = new EventEmitter();

  selectionChanged($event) {
    this.selectChange.emit($event);
  }
}
