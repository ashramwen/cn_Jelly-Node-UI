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
        label: 'nodeset.JNTimeNode.type',
        options: [{
          text: 'nodeset.JNTimeNode.interval',
          value: 'interval'
        }, {
          text: 'nodeset.JNTimeNode.schedule',
          value: 'cron'
        }]
      },
      controlType: JNRadioControl,
      $validators: []
    },
    cron: {
      input: {
        label: 'nodeset.JNTimeNode.schedule'
      },
      controlType: RuleCron,
      $validators: []
    },
    interval: {
      input: <ITextareaInput>{
        label: 'nodeset.JNTimeNode.interval',
        maxLength: 500
      },
      controlType: JNTextControl,
      $validators: []
    },
    timeUnit: {
      input: <ISelectInput>{
        label: 'nodeset.JNTimeNode.timeUnit',
        options: [{
          text: 'terms.day',
          value: 'day'
        }, {
          text: 'terms.hour',
          value: 'hour'
        }, {
          text: 'terms.minute',
          value: 'min'
        }]
      },
      controlType: JNSelectControl,
      $validators: []
    }
  }
})
export class JNTimeNodeEditorModel extends JNEditorModel {

  model: JNTimeNodeModel;  

  protected init() {
  }

  protected parse(data: JNTimeNodeModel) {
    this.setValue('timeType', data.timeType);
    this.setValue('timeUnit', data.timeUnit);
    this.setValue('cron', data.cron);
    this.setValue('interval', data.interval);
  }

  protected formate(): JNTimeNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    if (fieldName === 'timeType') {
      switch (value) {
        case 'cron':
          this.getInput('cron').hidden = false;
          this.getInput('timeUnit').hidden = true;
          this.getInput('interval').hidden = true;
          break;
        case 'interval':
          this.getInput('cron').hidden = true;
          this.getInput('timeUnit').hidden = false;
          this.getInput('interval').hidden = false;
          break;
        default:
          this.getInput('cron').hidden = true;
          this.getInput('timeUnit').hidden = false;
          this.getInput('interval').hidden = false;
          this.setValue('timeType', 'interval');
          break;
      }
    }
    this.model[fieldName] = value;
  }

}
