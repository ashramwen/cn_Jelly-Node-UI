import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNEditorFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNEditorControl } from '../../control.annotation';
import { IJNEditorFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNTextControl),
    multi: true
};

export interface ITextInput extends IJNEditorFormControlInput {
  maxLength?: number;
  max?: number;
  min?: number;
  type?: 'number' | 'text';
}

@JNEditorControl({
  template: `
    <jn-editor-text 
      [label]="inputs.label" 
      [disabled]="inputs.disabled" 
      [maxLength]="inputs.maxLength"
      [formControl]="formControl">
    </jn-editor-text>
  `
})
@Component({
  selector: 'jn-editor-text',
  styles: [
    require('./text.component.scss')
  ],
  template: `
    <div class="jn-form">
      <label class="jn-form-label">{{label | translate}}</label>
      <div class="jn-form-control">
        <input type="text" class="jn-text" placeholder="{{label | translate}}" [(ngModel)]="value" [disabled]="disabled"/>
      </div>
      <!--
      <md-input 
          placeholder="{{label | translate}}"
          #control
          [(ngModel)]="value" 
          maxlength="maxLength" 
          [disabled]="disabled">
        <md-hint align="end">
          {{control.characterCount}} / {{maxLength}}
        </md-hint>
      </md-input>
      -->
    </div>
  `,
  providers: [VALUE_ACCESSOR]
})
export class JNTextControl extends JNEditorFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected maxLength: number;
}
