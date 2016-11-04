import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNTextAreaControl),
    multi: true
};

@JNControl({
  template: `
    <jn-textarea [data]="data" [label]="label" [disabled]="disabled"
      formControlName="testValue">
    </jn-text>
  `
})
@Component({
  selector: 'jn-textarea',
  styles: [
    require('./textarea.component.scss')
  ],
  template: require('./textarea.component.html')
})
export class JNTextAreaControl extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected data: any;
}
