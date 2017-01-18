import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { BucketNodeModel } from './bucket-node-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';

@JNNodeEditor({
  title: 'Bucket',
  formControls: {
    field: {
      input: <ITextInput>{
        label: "Field",
      },
      controlType: JNTextControl,
      $validators: []
    },
    aggregation: {
      input: <ISelectInput>{
        label: "Agg",
        options: [{
          text: 'Date Histogram',
          value: 'dateHistogram'
        }, {
          text: 'Histogram',
          value: 'histogram'
        }, {
          text: 'Range',
          value: 'range'  
        }, {
          text: 'Terms',
          value: 'terms'  
        }]
      },
      controlType: JNSelectControl,
      $validators: []
    },
    interval: {
      input: <ITextInput>{
        label: "interval",
      },
      controlType: JNTextControl,
      $validators: []
    },
    unit: {
      input: <ISelectInput>{
        label: "Unit",
        options: [{
          text: 'Month',
          value: 'M'
        },{
          text: 'Day',
          value: 'd'
        }, {
          text: 'Hour',
          value: 'h'  
        }, {
          text: 'Minute',
          value: 'm'  
        }]
      },
      controlType: JNTextControl,
      $validators: []
    }
  }
})
export class BucketNodeEditorModel extends JNEditorModel{

  model: BucketNodeModel;  

  protected init() {
  }

  protected parse(data: BucketNodeModel) {
    this.setValue('aggregation', data.aggregation);
    this.setValue('field', data.field);
    this.setValue('interval', data.interval);
    this.setValue('unit', data.unit);
  }

  protected formate(): BucketNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    if (fieldName === 'aggregation') {
      if (value === 'dateHistogram') {
        this.getInput('interval').hidden = false;
        this.getInput('unit').hidden = false;
      }else if (value === 'histogram') {
        this.getInput('interval').hidden = false;
        this.getInput('unit').hidden = true;
      } else {
        this.getInput('interval').hidden = true;
        this.getInput('unit').hidden = true;
      }
    } 
    this.model[fieldName] = value;
  }
}