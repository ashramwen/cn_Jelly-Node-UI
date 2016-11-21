import { forwardRef, Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { JNEditorFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNEditorControl } from '../../control.annotation';
import { IJNEditorFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNRadioControl),
    multi: true
};

export interface IRadioInput extends IJNEditorFormControlInput {
  options: Array<IRadioOption>;
}

interface IRadioOption {
  text: string;
  value: string;
}

@JNEditorControl({
  template: `
    <jn-editor-radio 
      [label]="inputs.label" 
      [options]="inputs.options"
      [disabled]="inputs.disabled"
      [formControl]="formControl">
    </jn-editor-radio>
  `
})
@Component({
  selector: 'jn-editor-radio',
  styles: [
    require('./radio.component.scss')
  ],
  template: `
    <div class="jn-form">
      <label class="jn-form-label">{{label | translate}}</label>
      <md-radio-group [(ngModel)]="value" (ngModelChange)="modelChange(value)">
        <md-radio-button *ngFor="let d of options" [value]="d.value">
          {{d.text | translate}}
        </md-radio-button>
      </md-radio-group>
    </div>
    
  `,
  providers: [VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class JNRadioControl extends JNEditorFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected options: Array<IRadioOption>;

  modelChange(value) {
    this.value = value;
  }
}
