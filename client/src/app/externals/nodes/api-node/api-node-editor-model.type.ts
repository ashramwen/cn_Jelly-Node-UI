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
import { JNApiNodeModel } from './api-node-model.type';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { IJSONEditorInput, JNJSONEditorControl } from '../../../views/node-editor/components/controls/json-editor/json-editor.component';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNApiNode.nodename',
  formControls: {

    apiName: {
      input: <ITextInput>{
        label: 'nodeset.JNApiNode.apiName',
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
        label: 'nodeset.JNApiNode.requestMethod',
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
      input: <IJSONEditorInput>{
        label: 'Header',
      },
      controlType: JNJSONEditorControl,
      $validators: []
    },
    body: {
      input: <IJSONEditorInput>{
        label: 'Body',
      },
      controlType: JNJSONEditorControl,
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
    let model: JNApiNodeModel = <JNApiNodeModel>this.model;
    model[fieldName] = value;
  }
}
