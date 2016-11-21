import { Component, forwardRef, ViewEncapsulation, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNFormControl } from '../../interfaces/control.component';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNButtonToggleGroup),
    multi: true
};

interface ISelectOption {
  text: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
}

@Component({
  selector: 'jn-button-toggle-group',
  template: `
    <md-button-toggle-group multiple="true" (change)="change(item, $event)">
      <md-button-toggle *ngFor="let item of options"
        [checked]="hasChecked(item.value)" 
        (click)="change(item, $event)"
        [disabled]="item.disabled"
        [value]="item.value">
          {{item.text}}
      </md-button-toggle>
    </md-button-toggle-group>
  `,
  styles: [
    require('./button-toggle-group.component.scss')
  ],
  providers: [VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class JNButtonToggleGroup extends JNFormControl  implements OnChanges{
  @Input()
  protected disabled: boolean;
  @Input()
  protected options: ISelectOption[];
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.value) {
      this.value = value || [];
      this.options.forEach((o) => {
        if (this.value.find(v => v === o.value)) {
          o.checked = true;
        } else {
          o.checked = false;
        }
      });
    }
  }

  change(item, event) {
    item.checked = !item.checked;
    this.value = this.options.filter(o => o.checked)
      .map(o => o.value);
    this.selectionChanged.emit(event);
  }

  hasChecked(value) {
    return !!(this.value && this.value.indexOf(value) > -1);
  }

  ngOnChanges(value: {[key: string]: SimpleChange}) {
    if (value['options'].currentValue !== value['options'].previousValue) {
      this._value = this._value || [];
      this.options.forEach((o) => {
        o.checked = this._value.find(v => v === o.value);
      });
    }
  }
}
