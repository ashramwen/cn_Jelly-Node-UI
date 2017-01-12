import { forwardRef, Component, Input, Output, SimpleChange, OnChanges } from '@angular/core';
import { JNEditorFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNEditorControl } from '../../control.annotation';
import { IJNEditorFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNCheckTableControl),
    multi: true
};

export interface ICheckTableInput extends IJNEditorFormControlInput {
  tableFields: ITableField[];
  tableData: { [key: string]: any }[];
  valueField: string;
}

interface ITableField {
  displayName: string;
  fieldName: string;
}

@JNEditorControl({
  template: `
    <jn-editor-check-table 
      [label]="inputs.label" 
      [tableFields]="inputs.tableFields"
      [tableData]="inputs.tableData"
      [valueField]="inputs.valueField"
      [disabled]="inputs.disabled"
      [formControl]="formControl">
    </jn-editor-check-table>
  `
})
@Component({
  selector: 'jn-editor-check-table',
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
              {{field.displayName | translate}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of tableData" (click)="rowCheckChange(row, $event)">
            <td>
              <input type="checkbox" [(ngModel)]="row._checked" />
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
export class JNCheckTableControl extends JNEditorFormControl {
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

  rowCheckChange(row, $event: Event) {
    row._checked = !row._checked;
    if (!this._value) this._value = {};
    this.value = this.tableData
      .filter(r => r['_checked'])
      .map(r => r[this.valueField]);
    $event.stopPropagation();
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
