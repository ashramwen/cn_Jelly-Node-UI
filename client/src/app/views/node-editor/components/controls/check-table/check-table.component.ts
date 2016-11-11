import { forwardRef, Component, Input, Output, SimpleChange, OnChanges } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';
import { IJNFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNCheckTableControl),
    multi: true
};

export interface ICheckTableInput extends IJNFormControlInput {
  tableFields: ITableField[];
  tableData: { [key: string]: any }[];
  valueField: string;
}

interface ITableField {
  displayName: string;
  fieldName: string;
}

@JNControl({
  template: `
    <jn-check-table 
      [label]="inputs.label" 
      [tableFields]="inputs.tableFields"
      [tableData]="inputs.tableData"
      [valueField]="inputs.valueField"
      [disabled]="inputs.disabled"
      [formControl]="formControl">
    </jn-check-table>
  `
})
@Component({
  selector: 'jn-check-table',
  styles: [
    require('./check-table.component.scss')
  ],
  template: `
    <div class="jn-form">
      <label class="jn-form-label">{{label | translate}}</label>
      <table class="jn-table">
        <thead>
          <tr>
            <th></th>
            <th *ngFor="let field of tableFields">
              {{field.displayName}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of tableData">
            <td>
              <input type="checkbox" [(ngModel)]="row._checked" (change)="rowCheckChange(row, $event)" />
            </td>
            <td *ngFor="let field of tableFields">
              {{row[field.fieldName]}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  providers: [VALUE_ACCESSOR]
})
export class JNCheckTableControl extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected tableFields: ITableField[];
  @Input()
  protected tableData: { [key: string]: any }[];
  @Input()
  protected valueField: string;

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.dataChange();
      if (this.onChange) {
        this.onChange(v);
      }
    }
  }

  rowCheckChange(row, value) {
    row._checked = value;
    if (!this._value) this._value = {};
    this.value = this.tableData
      .filter(r => r['_checked'])
      .map(r => r[this.valueField]);
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['tableData'].previousValue !== changes['tableData'].currentValue) {
      this.dataChange();
    }
  }

  dataChange() {
    if (!this._value) return;
    this.tableData
      .filter(row => this._value.find(v => row[this.valueField] === v))
      .forEach((t) => {
        t['_checked'] = true;
      });
  }
}
