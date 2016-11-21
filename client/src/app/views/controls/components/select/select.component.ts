import { Component, ViewEncapsulation, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNFormControl } from '../../interfaces/control.component';


const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNSelect),
    multi: true
};

export interface ISelectOption {
  text: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'jn-select',
  styles: [
    require('./select.component.scss')
  ],
  template: `
      <bm-ng2-select [(ngModel)]="value" (selectionChanged)="selectChanged($event)">
        <bm-ng2-option *ngFor="let o of options" [value]="o.value" [disabled]="o.disabled">{{o.text | translate}}</bm-ng2-option>
      </bm-ng2-select>
  `,
  providers: [VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class JNSelect extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected options: ISelectOption;
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  selectChanged($event) {
    this.selectionChanged.emit($event);
  }
}
