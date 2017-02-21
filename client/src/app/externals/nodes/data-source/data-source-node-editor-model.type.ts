import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput } from '../../../views/node-editor/components/controls/select/select.component';
import { DataSourceNodeModel } from './data-source-node-model.type';

@JNNodeEditor({
  title: 'nodeset.JNTimeNode.nodename',
  formControls: { }
})
export class DataSourceNodeEditorModel extends JNEditorModel{

  model: DataSourceNodeModel;  

  protected init() {
  }

  protected parse(data: DataSourceNodeModel) {
  }

  protected formate(): DataSourceNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}