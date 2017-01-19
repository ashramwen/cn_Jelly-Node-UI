import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput } from '../../../views/node-editor/components/controls/select/select.component';
import { AnyNodeModel } from './any-node-model.type';

@JNNodeEditor({
  title: 'nodeset.JNTimeNode.nodename',
  formControls: {
    name: {
      input: <ITextInput>{
        label: "Name",
      },
      controlType: JNTextControl,
      $validators: []
    }
  }
})
export class AnyNodeEditorModel extends JNEditorModel{

  model: AnyNodeModel;  

  protected init() {
  }

  protected parse(data: AnyNodeModel) {
  }

  protected formate(): AnyNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}