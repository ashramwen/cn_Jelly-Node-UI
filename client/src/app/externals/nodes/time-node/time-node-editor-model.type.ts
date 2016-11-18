import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { JNTimeNodeModel } from './time-node-model.type';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { RuleCron } from '../../controls/cron/cron.component';

import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNTimeNode.nodename',
  formControls: {
    timeType: {
      input: <IRadioInput>{
        label: '触发类型',
        options: [{
          text: '固定间隔',
          value: 'interval'
        }, {
          text: '定时定点',
          value: 'cron'
        }]
      },
      controlType: JNRadioControl,
      $validators: []
    },
    cron: {
      input: {
        label: '表达式'
      },
      controlType: RuleCron,
      $validators: []
    },
    interval: {
      input: <ITextareaInput>{
        label: '间隔时间',
        maxLength: 500
      },
      controlType: JNTextControl,
      $validators: []
    },
    unit: {
      input: <ISelectInput>{
        label: '时间单位',
        options: [{
          text: '天',
          value: 'day'
        }, {
          text: '小时',
          value: 'hour'
        }, {
          text: '分钟',
          value: 'min'
        }]
      },
      controlType: JNSelectControl,
      $validators: []
    }
  }
})
export class JNTimeNodeEditorModel extends JNEditorModel {


  protected init() {
  }

  protected parse(data: JNTimeNodeModel) {
    this.setValue('timeType', data.timeType);
    this.setValue('unit', data.timeUnit);
    this.setValue('cron', data.cron);
    this.setValue('interval', data.interval);
  }

  protected formate(): JNTimeNodeModel {
    return <JNTimeNodeModel> JNTimeNodeModel.deserialize(this.formGroup.value);
  }

  protected updated(fieldName: string, value: any): void {
    if (fieldName === 'timeType') {
      switch (value) {
        case 'interval':
          this.getInput('cron').hidden = true;
          this.getInput('unit').hidden = false;
          this.getInput('interval').hidden = false;
          break;
        case 'cron':
          this.getInput('cron').hidden = false;
          this.getInput('unit').hidden = true;
          this.getInput('interval').hidden = true;
          break;
        default:
          break;
      }
    }
  }

}
