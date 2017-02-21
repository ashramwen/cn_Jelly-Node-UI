import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { TermsFilterNodeModel } from './terms-filter-node-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';

@JNNodeEditor({
  title: 'TermsFilterNode',
  formControls: {
    field: {
      input: <ITextInput>{
        label: "Field",
      },
      controlType: JNTextControl,
      $validators: []
    },
    terms: {
      input: <ITextInput>{
        label: "Terms",
      },
      controlType: JNTextControl,
      $validators: []
    }
  }
})
export class TermsFilterNodeEditorModel extends JNEditorModel{

  model: TermsFilterNodeModel;

  protected init() {
  }

  protected parse(data: TermsFilterNodeModel) {
    this.setValue('field', data.field);
    this.setValue('terms', data.terms);
  }

  protected formate(): TermsFilterNodeModel {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    this.model[fieldName] = value;
  }
}