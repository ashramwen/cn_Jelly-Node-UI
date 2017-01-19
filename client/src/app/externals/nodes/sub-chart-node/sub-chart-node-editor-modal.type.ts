import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { SubChartNodeModel } from './sub-chart-node-model.type';

@JNNodeEditor({
  title: 'Metric',
  formControls: {
    field: {
      input: <ITextInput>{
        label: "Field",
      },
      controlType: JNTextControl,
      $validators: []
    },
    aggregationMethod: {
      input: <ISelectInput>{
        label: "method",
        options: [{
          text: 'Average',
          value: 'avg'
        }, {
          text: 'Maximun',
          value: 'max'
        }, {
          text: 'Minimun',
          value: 'min'  
        }, {
          text: 'Sum',
          value: 'sum'  
        }, {
          text: 'Count',
          value: 'count' 
        }]
      },
      controlType: JNSelectControl,
      $validators: []
    }
  }
})
export class SubChartNodeEditorModel extends JNEditorModel{

  model: SubChartNodeModel;  

  protected init() {
  }

  protected parse(data: SubChartNodeModel) {
    this.setValue('xAxisDisplayName', data.xAxisDisplayName);
    this.setValue('yAxisDisplayName', data.yAxisDisplayName.join(';'));
  }

  protected formate(): SubChartNodeModel {
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