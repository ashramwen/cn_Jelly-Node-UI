import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { RuleApplication } from '../../rule-application-core';
import { JNUtils } from '../../../share/util';
import { JNConditionNodeModel } from './condition-node-model.type';
import { RulePropertyCondition, IPropertyConditionsInput } from '../../controls/property-condition/property-condition.component';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { ConditionNodeService } from './condition-node.service';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNConditionNode.nodename',
  formControls: {
    conditionGroup: {
      input: <IPropertyConditionsInput>{
        label: '连接表达式',
        conditions: []
      },
      controlType: RulePropertyCondition
    }
  }
})
export class JNConditionNodeEditorModel extends JNEditorModel {

  model: JNConditionNodeModel;

  protected init() {
  }

  protected parse(data: JNConditionNodeModel) {
    let conditions = ConditionNodeService.instance.buildConditions(data);
    (<IPropertyConditionsInput>this.getInput('conditionGroup')).conditions = conditions;
    this.setValue('conditionGroup', data.conditions);
  }

  protected formate(): JNConditionNodeModel {
    return <JNConditionNodeModel>this.model;
  }

  protected updated(fieldName: string, value: any): void {
    if (!value) return;
    (<Array<any>>value).forEach((_c) => {
      let condition = this.model.conditions.find((c) => {
        return c.property === _c.property;
      });
      condition.aggregation = _c.aggregation;
      condition.operator = _c.operator;
      condition.value = _c.value;
    });
  }

}
