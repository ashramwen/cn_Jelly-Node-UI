import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { ChartContainerNodeModel } from './chart-container-node-model';

@JNNodeEditor({
  title: 'Chart Container',
  formControls: {
  }
})
export class ChartContainerNodeEditorModel extends JNEditorModel{

  model: ChartContainerNodeModel;  

  protected init() {
  }

  protected parse(data: ChartContainerNodeModel) {
    
  }

  protected formate(): ChartContainerNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}