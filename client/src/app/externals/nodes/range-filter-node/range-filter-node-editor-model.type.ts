import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { RangeFilterNodeModel } from './range-filter-node-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';

@JNNodeEditor({
  title: 'RangeFilter',
  formControls: {
    field: {
      input: <ITextInput>{
        label: "Field",
      },
      controlType: JNTextControl,
      $validators: []
    },
    operator: {
      input: <ISelectInput>{
        label: "Operator",
        options: [{
          text: '>=',
          value: 'gte'
        }, {
          text: '>',
          value: 'gt'
        }, {
          text: '<=',
          value: 'lte'
        }, {
          text: '<',
          value: 'lt'
        }]
      },
      controlType: JNSelectControl,
      $validators: []
    },
    value: {
      input: <ITextInput>{
        label: "Value",
      },
      controlType: JNTextControl,
      $validators: []
    }
  }
})
export class RangeFilterNodeEditorModel extends JNEditorModel{

  model: RangeFilterNodeModel;

  protected init() {
  }

  protected parse(data: RangeFilterNodeModel) {
    this.setValue('field', data.field);
    this.setValue('operator', data.operator);
    this.setValue('value', data.value);
  }

  protected formate(): RangeFilterNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}