import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNTextControl),
    multi: true
};

@JNControl({
  template: `
    <jn-text [data]="data" [label]="label" [disabled]="disabled"
      [formControl]="formControl">
    </jn-text>
  `
})
@Component({
  selector: 'jn-text',
  styles: [
    require('./text.scss')
  ],
  template: require('./text.html'),
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
  protected data: any;
}
