import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { RuleApplication } from '../../rule-application-core';
import { JNUtils } from '../../../share/util';
import { JNConjunctionNodeModel } from './conjunction-node-model.type';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNConjunctionNode.nodename',
  formControls: {
    conjunction: {
      input: <ISelectInput>{
        label: '连接表达式',
        options: [{
          text: '与',
          value: 'and'
        }, {
          text: '或',
          value: 'or'
        }, {
          text: '非',
          value: 'nor'
        }]
      },
      controlType: JNSelectControl,
    }
  }
})
export class JNConjunctionNodeEditorModel extends JNEditorModel {


  protected init() {
  }

  protected parse(data: JNConjunctionNodeModel) {
    this.setValue('conjunction', data.conjunction);
  }

  protected formate(): JNConjunctionNodeModel {
    return <JNConjunctionNodeModel>this.model;
  }

  protected updated(fieldName: string, value: any): void {
  }

}
