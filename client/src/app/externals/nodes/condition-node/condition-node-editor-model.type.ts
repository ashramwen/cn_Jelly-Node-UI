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
import { ConditionNodeService } from './condition-node.service';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';


export class JNConditionNodeEditorModel extends JNEditorModel {

  title: String = 'nodeset.JNDevicePropertyNode.nodename';

  protected init() {
    this.formControls = {
      conjunction: {
        input: <IPropertyConditionsInput>{
          label: '连接表达式',
          conditions: []
        },
        controlType: RulePropertyCondition,
        $validators: [],
        formControl: new FormControl()
      }
    };
  }

  protected parse(data: JNConditionNodeModel) {
    let conditions = ConditionNodeService.instance.buildConditions(data);
    (<IPropertyConditionsInput>this.getInput('conjunction')).conditions = conditions;
  }

  protected formate(): JNConditionNodeModel {
    return <JNConditionNodeModel>this.model;
  }

  protected updated(fieldName: string, value: any): void {
  }

}