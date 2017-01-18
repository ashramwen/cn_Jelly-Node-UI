import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { RuleApplication } from '../../rule-application-core';
import { JNUtils } from '../../../share/util';
import { JNFilterNodeModel } from './filter-node-model.type';
import { RulePropertyCondition, IPropertyConditionsInput } from '../../controls/property-condition/property-condition.component';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNFilterNode.nodename',
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
export class JNFilterNodeEditorModel extends JNEditorModel {

  model: JNFilterNodeModel;

  protected init() {
  }

  protected parse(data: JNFilterNodeModel) {
    this.setValue("expressions", data.expressions);
  }

  protected formate(): JNFilterNodeModel {
    return <JNFilterNodeModel>this.model;
  }

  protected updated(fieldName: string, value: any): void {
    if (!value) return;
    (<Array<any>>value).forEach((_c) => {
      let expression = this.model.expressions.find((c) => {
        return c.field === _c.field;
      });
      expression.field = _c.fi;
      expression.operator = _c.operator;
      expression.valueHolder = _c.valueHolder;
    });
  }

}
