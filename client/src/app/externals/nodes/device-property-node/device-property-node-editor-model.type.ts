import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput } from '../../../views/node-editor/components/controls/select/select.component';
import { JNDevicePropertyNodeModel } from './device-property-node-model.type';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';


export class JNDevicePropertyNodeEditorModel extends JNEditorModel {

  title: String = 'nodeset.JNDevicePropertyNode.nodename';

  protected init() {
    this.formControls = {
      property: {
        input: <ISelectInput>{
          label: '规则名称',
          options: []
        },
        controlType: JNTextControl,
        $validators: [],
        formControl: new FormControl()
      }
    };
  }

  protected parse(data: JNDevicePropertyNodeModel) {
  }

  protected formate(): JNDevicePropertyNodeModel {
    return <JNDevicePropertyNodeModel> JNDevicePropertyNodeModel.deserialize(this.formGroup.value);
  }

  protected updated(fieldName: string, value: any): void {
    
  }

}
