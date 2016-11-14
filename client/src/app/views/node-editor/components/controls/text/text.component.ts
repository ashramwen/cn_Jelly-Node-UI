import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';
import { IJNFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNTextControl),
    multi: true
};

export interface ITextInput extends IJNFormControlInput {
  maxLength?: number;
  max?: number;
  min?: number;
  type?: 'number' | 'text';
}

@JNControl({
  template: `
    <jn-text 
      [label]="inputs.label" 
      [disabled]="inputs.disabled" 
      [maxLength]="inputs.maxLength"
      [formControl]="formControl">
    </jn-text>
  `
})
@Component({
  selector: 'jn-text',
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
export class JNTextControl extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected maxLength: number;
}
