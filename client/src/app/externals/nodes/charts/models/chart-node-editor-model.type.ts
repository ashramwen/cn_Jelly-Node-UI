import { JNNodeEditor } from '../../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../../views/node-editor/components/controls/text/text.component';
import { ChartNodeModel } from './chart-node-model.type';


import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNTimeNode.nodename',
  formControls: {
    name: {
      input: <ITextInput>{
        label: "Name",
      },
      controlType: JNTextControl,
      $validators: []
    },
    xAxisDisplayName: {
      input: <ITextInput>{
        label: "X Label",
      },
      controlType: JNTextControl,
      $validators: []
    },
    yAxisDisplayName: {
      input: <ITextInput>{
        label: "Y Label",
      },
      controlType: JNTextControl,
      $validators: []
    }
  }
})
export class ChartNodeEditorModel extends JNEditorModel{

  model: ChartNodeModel;  

  protected init() {
  }

  protected parse(data: ChartNodeModel) {
    this.setValue('name', data.name);
    this.setValue('xAxisDisplayName', data.xAxisDisplayName);
    this.setValue('yAxisDisplayName', data.yAxisDisplayName.join(';'));
  }

  protected formate(): ChartNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    if (fieldName === 'yAxisDisplayName') {
      this.model.yAxisDisplayName = value.split(';');
    } else {
      this.model[fieldName] = value;
    }
  }
}