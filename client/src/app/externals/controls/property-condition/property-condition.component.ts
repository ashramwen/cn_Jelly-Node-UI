import { forwardRef, Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IJNEditorFormControlInput } from '../../../views/node-editor/interfaces/form-control-input.interface';
import { JNEditorControl } from '../../../views/node-editor/components/control.annotation';
import { JNEditorFormControl } from '../../../views/node-editor/components/control.component';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RulePropertyCondition),
    multi: true
};

export interface IPropertyConditionsInput extends IJNEditorFormControlInput {
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

@JNEditorControl({
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
    require('../../../views/node-editor/components/control.scss'),
    require('./property-condition.component.scss')
  ],
  templateUrl: './property-condition.component.html',
  providers: [VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class RulePropertyCondition extends JNEditorFormControl {
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
    text: '＞',
    value: 'gt'
  }, {
    text: '≥',
    value: 'gte',
  }, {
    text: '＜',
    value: 'lt'
  }, {
    text: '≤',
    value: 'lte'
  }];

  private _aggregations = [{
    text: 'terms.sum',
    value: 'sum'
  }, {
    text: 'terms.min',
    value: 'min'
  }, {
    text: 'terms.max',
    value: 'max'
  }, {
    text: 'terms.average',
    value: 'avg'
  }, {
    text: 'terms.count',
    value: 'count'
  }];

  get aggregationOptions() {
    return this._aggregations;
  }

  getOperators(type) {
    return type === 'enum' || type === 'value' ?
      [this._operators[0], this._operators[1]]
      : this._operators;
  }

  modelChange() {
    this.value = this.conditions.map((condition) => {
      if (condition.type === 'range') {
        condition.value = parseFloat(condition.value);
      }
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
