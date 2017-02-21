import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { AnalysisTargetNodeModel } from './analysis-target-node-model.type';

@JNNodeEditor({
  title: 'nodeset.JNTimeNode.nodename',
  formControls: {
    analysisTarget: {
      input: <ISelectInput>{
        label: "Target",
        options: [{
          text: 'sample_index1',
          value: 'sample_index1'
        }, {
          text: 'sample_index2',
          value: 'sample_index2'
        }]
      },
      controlType: JNSelectControl,
      $validators: []
    }
  }
})
export class AnalysisTargetNodeEditorModel extends JNEditorModel{

  model: AnalysisTargetNodeModel;  

  protected init() {
  }

  protected parse(data: AnalysisTargetNodeModel) {
    this.setValue('analysisTarget', data.analysisTarget);
  }

  protected formate(): AnalysisTargetNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}