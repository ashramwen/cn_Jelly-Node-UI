import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput } from '../../../views/node-editor/components/controls/select/select.component';
import { AnalysisTargetNodeModel } from './analysis-target-node-model.type';

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
export class AnalysisTargetNodeEditorModel extends JNEditorModel{

  model: AnalysisTargetNodeModel;  

  protected init() {
  }

  protected parse(data: AnalysisTargetNodeModel) {
  }

  protected formate(): AnalysisTargetNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}