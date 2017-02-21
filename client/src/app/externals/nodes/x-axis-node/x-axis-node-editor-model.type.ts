import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput } from '../../../views/node-editor/components/controls/select/select.component';
import { XAxisNodeModel } from './x-axis-node-model.type';

@JNNodeEditor({
  title: 'nodeset.JNTimeNode.nodename',
  formControls: {
    xAxisDisplayName: {
      input: <ITextInput>{
        label: "X Axis",
      },
      controlType: JNTextControl,
      $validators: []
    }
  }
})
export class XAxisNodeEditorModel extends JNEditorModel{

  model: XAxisNodeModel;  

  protected init() {
  }

  protected parse(data: XAxisNodeModel) {
  }

  protected formate(): XAxisNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}