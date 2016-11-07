import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { JNDeviceTypeNodeModel } from './device-type-node-model.type';

export class JNDeviceTypeNodeEditorModel extends JNEditorModel {

  title: String = 'nodeset.JNRuleNode.nodename';

  protected init() {
    this.formControls = {    };
  }

  protected parse(data: JNDeviceTypeNodeModel) {
  }

  protected formate(): JNDeviceTypeNodeModel {
    return <JNDeviceTypeNodeModel> JNDeviceTypeNodeModel.deserialize(this.formGroup.value);
  }

  protected updated(fieldName: string, value: any): void {

  }
}
