import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNEditorFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNEditorControl } from '../../control.annotation';
import { IJNEditorFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNTextAreaControl),
    multi: true
};

export interface ITextareaInput extends IJNEditorFormControlInput {
  maxLength: number;
}

@JNEditorControl({
  template: `
    <jn-editor-textarea 
      [label]="inputs.label" 
      [disabled]="inputs.disabled" 
      [maxLength]="inputs.maxLength"
      [formControl]="formControl">
    </jn-editor-textarea>
  `
})
@Component({
  selector: 'jn-editor-textarea',
  styles: [
    require('./textarea.component.scss')
  ],
  template: `
    <div class="jn-form">
      <label class="jn-form-label">{{label | translate}}</label>
      <div class="jn-form-control">
        <textarea class="jn-textarea"
          placeholder="{{label | translate}}"
          #control
          [(ngModel)]="value" 
          maxlength="maxLength" 
          [disabled]="disabled"
        ></textarea>
      </div>
    </div>
  `,
  providers: [VALUE_ACCESSOR]
})
export class JNTextAreaControl extends JNEditorFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected maxLength: number;
}
