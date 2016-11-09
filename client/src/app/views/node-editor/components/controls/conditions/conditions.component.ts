import { forwardRef, Component, Input, Output } from '@angular/core';
import { JNFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';
import { IJNFormControlInput } from '../../../interfaces/form-control-input.interface';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNConditionsControl),
    multi: true
};

export interface IConditionsInput extends IJNFormControlInput {
  conditions: Array<ICondition>;
}

export interface ICondition {
  property: string;
  text: string;
  type: 'enum' | 'range';
  value: any;
  options?: {
    text: string;
    value: any;
  };
}

export interface IConditionResult {
  [property: string]: {
    value: any;
    operator: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
  };
}

@JNControl({
  template: `
    <jn-conditions 
      [label]="inputs.label" 
      [conditions]="inputs.conditions"
      [disabled]="inputs.disabled"
      [formControl]="formControl">
    </jn-conditions>
  `
})
@Component({
  selector: 'jn-conditions',
  styles: [
    require('./conditions.component.scss')
  ],
  template: `
    <div *ngFor="let condition of conditions">
      <div [ngSwitch]="condition.type">
        <label>{{condition.text}}</label>
        <select [(ngModel)]="value[condition.property].operator" (ngModelChange)="modelChange($event)">
          <option *ngFor="let o of getOperators(condition.type)" [value]="o.value">{{o.text}}</option>
        </select>
        <select [(ngModel)]="value[condition.property].value" *ngSwitchWhen="enum" (ngModelChange)="modelChange($event)">
          <option *ngFor="let o of condition.options" [value]="o.value">{{o.text}}</option>
        </select>
        <input type="text" *ngSwitchWhen="range" [(ngModel)]="value[condition.property].value" (ngModelChange)="modelChange($event)" />
      </div>
    </div>
  `,
  providers: [VALUE_ACCESSOR]
})
export class JNConditionsControl extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected conditions: Array<ICondition>;

  private _operators = [{
    text: '=',
    value: 'eq'
  }, {
    text: '≠',
    value: 'ne'
  }, {
    text: '>',
    value: 'gt'
  }, {
    text: '>=',
    value: 'gte',
  }, {
    text: '<',
    value: 'lt'
  }, {
    text: '<=',
    value: 'lte'
  }];

  getOperators(type) {
    return type === 'enum' ?
      [this._operators[0], this._operators[1]]
      : this._operators;
  }

  modelChange() {
    this.value = this.value;
  }

  protected init() {
    this._value = this._value || {};
  }

}
