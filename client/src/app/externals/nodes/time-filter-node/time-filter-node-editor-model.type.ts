import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { TimeFilterNodeModel } from './time-filter-node-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';

@JNNodeEditor({
  title: 'TimeFilter',
  formControls: {
    field: {
      input: <ITextInput>{
        label: "Field",
      },
      controlType: JNTextControl,
      $validators: []
    },
    startAt: {
      input: <ITextInput>{
        label: "StartAt",
      },
      controlType: JNTextControl,
      $validators: []
    },
    endAt: {
      input: <ITextInput>{
        label: "EndAt",
      },
      controlType: JNTextControl,
      $validators: []
    }
  }
})
export class TimeFilterNodeEditorModel extends JNEditorModel{

  model: TimeFilterNodeModel;

  protected init() {
  }

  protected parse(data: TimeFilterNodeModel) {
    this.setValue('field', data.field);
    this.setValue('startAt', data.startAt);
    this.setValue('endAt', data.endAt);
  }

  protected formate(): TimeFilterNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}