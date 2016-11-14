import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { RuleApplication } from '../../rule-application-core';
import { JNUtils } from '../../../share/util';
import { ISchemaProperty } from '../../resources/schema.type';
import { JNFormControl } from '../../../views/node-editor/components/control.component';
import { JNApiNodeModel } from './api-node-model.type';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNApiNode.nodename',
  formControls: {

    apiName: {
      input: <ITextInput>{
        label: 'API名称',
        maxLength: 0,
      },
      controlType: JNTextControl,
      $validators: []
    },
    apiUrl: {
      input: <ITextInput>{
        label: 'URL',
        maxLength: 0,
      },
      controlType: JNTextControl,
      $validators: []
    },
    method: {
      input: <ISelectInput>{
        label: '请求方式',
        options: [{
          text: 'GET',
          value: 'GET'
        }, {
          text: 'POST',
          value: 'POST'
        }, {
          text: 'PUT',
          value: 'PUT'
        }, {
          text: 'DELETE',
          value: 'DELETE'
        }]
      },
      controlType: JNSelectControl,
      $validators: []
    },
    header: {
      input: <ITextareaInput>{
        label: 'Header',
        maxLength: 0,
      },
      controlType: JNTextAreaControl,
      $validators: []
    },
    body: {
      input: <ITextareaInput>{
        label: 'Body',
        maxLength: 0,
      },
      controlType: JNTextAreaControl,
      $validators: []
    }
  }
})
export class JNApiNodeEditorModel extends JNEditorModel {


  protected init() {
  }

  protected parse(data: JNApiNodeModel) {
    this.setValue('apiName', data.apiName);
    this.setValue('apiUrl', data.apiUrl);
    this.setValue('method', data.method);
    this.setValue('header', data.header);
    this.setValue('body', data.body);
  }

  protected formate(): JNApiNodeModel {
    return <JNApiNodeModel>this.model;
  }

  protected updated(fieldName: string, value: any): void {
  }
}
