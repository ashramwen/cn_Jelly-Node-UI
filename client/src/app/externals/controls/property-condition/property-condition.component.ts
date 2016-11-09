import { forwardRef, Component, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IJNFormControlInput } from '../../../views/node-editor/interfaces/form-control-input.interface';
import { JNControl } from '../../../views/node-editor/components/control.annotation';
import { JNFormControl } from '../../../views/node-editor/components/control.component';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RulePropertyCondition),
    multi: true
};

export interface IPropertyConditionsInput extends IJNFormControlInput {
  conditions: Array<IPropertyCondition>;
}

export interface IPropertyCondition {
  property: string;
  text: string;
  type: 'value'| 'enum'| 'range';
  aggregation?: 'sum' | 'count' | 'avg' | 'max' | 'min';
  value?: any;
  operator?: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
  options?: {
    text: string;
    value: any;
  }[];
}

export interface IConditionResult {
  value: string | number;
  property: string;
  operator: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
  aggregation: 'sum' | 'count' | 'avg' | 'max' | 'min';
}

@JNControl({
  template: `
    <rule-conditions 
      [label]="inputs.label" 
      [conditions]="inputs.conditions"
      [disabled]="inputs.disabled"
      [formControl]="formControl">
    </rule-conditions>
  `
})
@Component({
  selector: 'rule-conditions',
  styles: [
    require('./property-condition.component.scss')
  ],
  template: `
    <div *ngFor="let condition of conditions">
      <div [ngSwitch]="condition.type">
        <!-- range type row -->
        <template [ngSwitchCase]="'range'">
          <label>{{condition.text}}</label>
          <select [(ngModel)]="condition.aggregation" (ngModelChange)="modelChange($event)">
            <option *ngFor="let o of aggregationOptions" [value]="o.value">{{o.text}}</option>
          </select>
          <select [(ngModel)]="condition.operator" (ngModelChange)="modelChange($event)">
            <option *ngFor="let o of getOperators(condition.type)" [value]="o.value">{{o.text}}</option>
          </select>
          <input type="text" [(ngModel)]="condition.value" (ngModelChange)="modelChange($event)" />
        </template>

        <!-- enum type row -->
        <template [ngSwitchCase]="'enum'">
          <label>{{condition.text}}</label>
          <select [(ngModel)]="condition.operator" (ngModelChange)="modelChange($event)">
            <option *ngFor="let o of getOperators(condition.type)" [value]="o.value">{{o.text}}</option>
          </select>
          <select [(ngModel)]="condition.value" (ngModelChange)="modelChange($event)">
            <option *ngFor="let o of condition.options" [value]="o.value">{{o.text}}</option>
          </select>
        </template>
      </div>
    </div>
  `,
  providers: [VALUE_ACCESSOR]
})
export class RulePropertyCondition extends JNFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected conditions: Array<IPropertyCondition>;

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

  private _aggregations = [{
    text: '求和',
    value: 'sum'
  }, {
    text: '最小值',
    value: 'min'
  }, {
    text: '最大值',
    value: 'max'
  }, {
    text: '平均值',
    value: 'avg'
  }, {
    text: '计数',
    value: 'count'
  }];

  get aggregationOptions() {
    return this._aggregations;
  }

  getOperators(type) {
    return type === 'enum' ?
      [this._operators[0], this._operators[1]]
      : this._operators;
  }

  modelChange() {
    this.value = this.conditions.map((condition) => {
      return {
        value: condition.value,
        property: condition.property,
        operator: condition.operator,
        aggregation: condition.aggregation
      };
    });
  }

  protected init() {
    this._value = this._value || {};
  }

}
