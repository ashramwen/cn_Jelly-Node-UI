import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput } from '../../../views/node-editor/components/controls/select/select.component';
import { DrilldownNodeModel } from './drilldown-node-model.type';

@JNNodeEditor({
  title: 'nodeset.JNTimeNode.nodename',
  formControls: {}
})
export class DrilldownEditorModel extends JNEditorModel{

  model: DrilldownNodeModel;  

  protected init() {
  }

  protected parse(data: DrilldownNodeModel) {
  }

  protected formate(): DrilldownNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}