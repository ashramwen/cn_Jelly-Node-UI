import { JNNodeEditor } from '../../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../../views/node-editor/components/controls/text/text.component';
import { ChartNodeModel } from './chart-node-model.type';
import { ISelectInput, JNSelectControl } from '../../../../views/node-editor/components/controls/select/select.component';


import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'Chart',
  formControls: {
    fieldName: {
      input: <ISelectInput>{
        label: "Field",
        options: [{
          text: "CO2",
          value: "CO2"
        }, {
          text: "Temperature",
          value: "Temperature"  
        }]
      },
      controlType: JNSelectControl,
      $validators: []
    }
  }
})
export class ChartNodeEditorModel extends JNEditorModel{

  model: ChartNodeModel;  

  protected init() {
  }

  protected parse(data: ChartNodeModel) {
    this.setValue('fieldName', data.fieldName);
  }

  protected formate(): ChartNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}