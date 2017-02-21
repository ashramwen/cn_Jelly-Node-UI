import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { MetricNodeModel } from './metric-node-model.type';

@JNNodeEditor({
  title: 'Metric',
  formControls: {
    field: {
      input: <ISelectInput>{
        label: "Field",
        options: [{
          text: 'CO2',
          value: 'CO2'
        }, {
          text: 'Temperature',
          value: 'Temperature'  
        }, {
          text: 'location',
          value: 'location'  
        }]
      },
      controlType: JNSelectControl,
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
export class MetricNodeEditorModel extends JNEditorModel{

  model: MetricNodeModel;  

  protected init() {
  }

  protected parse(data: MetricNodeModel) {
    this.setValue('aggregationMethod', data.aggregationMethod);
    this.setValue('field', data.field);
  }

  protected formate(): MetricNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}