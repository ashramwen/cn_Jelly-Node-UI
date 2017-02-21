import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput } from '../../../views/node-editor/components/controls/select/select.component';
import { YAxisNodeModel } from './y-axis-node-model.type';

@JNNodeEditor({
  title: 'nodeset.JNTimeNode.nodename',
  formControls: {
    yAxisDisplayName: {
      input: <ITextInput>{
        label: "Y Label",
      },
      controlType: JNTextControl,
      $validators: []
    }
  }
})
export class YAxisNodeEditorModel extends JNEditorModel{

  model: YAxisNodeModel;  

  protected init() {
  }

  protected parse(data: YAxisNodeModel) {
  }

  protected formate(): YAxisNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}