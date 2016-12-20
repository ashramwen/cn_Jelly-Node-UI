import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { JNRuleNode } from './rule-node.type';
import { JNRuleNodeModel } from './rule-node-model.type';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNRuleNode.nodename',
  formControls: {
    ruleName: {
      input: <ITextInput>{
        label: '规则名称',
        maxLength: 50
      },
      controlType: JNTextControl,
      $validators: [{
        validator: (fc: FormControl) => {
          return new Promise((resolve, reject) => {
            if (fc.value && fc.value.length > 10) {
              resolve(false);
              return;
            }
            resolve(true);
          });
        },
        errorName: 'maxLength',
        msg: '最大长度不可超过10'
      }]
    },
    triggerWhen: {
      input: <IRadioInput>{
        label: '何时触发',
        options: [
          { text: '为真', value: 'CONDITION_TRUE' },
          { text: '由假转真', value: 'CONDITION_FALSE_TO_TRUE' },
          { text: '由真转假', value: 'CONDITION_TRUE_TO_FALSE' },
          { text: '改变', value: 'CONDITION_CHANGE' }
        ]
      },
      controlType: JNRadioControl,
      $validators: []
    },
    description: {
      input: <ITextareaInput>{
        label: '描述',
        maxLength: 500
      },
      controlType: JNTextAreaControl,
      $validators: []
    }
  }
})
export class JNRuleNodeEditorModel extends JNEditorModel {

  model: JNRuleNodeModel;

  protected init() {
  }

  protected parse(data: JNRuleNodeModel) {
    this.setValue('ruleName', data.ruleName);
    this.setValue('description', data.description);
    this.setValue('triggerWhen', data.triggerWhen);
  }

  protected formate(): JNRuleNodeModel {
    this.model.extends(this.formGroup.value);
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {

  }

}
