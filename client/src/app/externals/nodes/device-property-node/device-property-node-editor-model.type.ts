import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { JNDevicePropertyNodeModel } from './device-property-node-model.type';
import { RuleApplication } from '../../rule-application-core';
import { JNUtils } from '../../../share/util';
import { ISchemaProperty } from '../../resources/schema.type';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNDevicePropertyNode.nodename',
  formControls: {
    property: {
      input: <ISelectInput>{
        label: '设备属性',
        options: []
      },
      controlType: JNSelectControl,
      $validators: [],
    }
  }
})
export class JNDevicePropertyNodeEditorModel extends JNEditorModel {

  protected init() {
  }

  protected parse(data: JNDevicePropertyNodeModel) {
    if (!data.typeName) return;
    let schema = RuleApplication.instance.resources.$schema.schemas[data.typeName];
    let properties = JNUtils.toArray<ISchemaProperty>(schema.content.statesSchema.properties);
    (<ISelectInput>this.getInput('property')).options = properties
      .map((property) => {
        return {
          text: property.value.displayNameCN,
          value: property.key
        };
      });
    this.setValue('property', data.property);
  }

  protected formate(): JNDevicePropertyNodeModel {
    return <JNDevicePropertyNodeModel>this.model;
  }

  protected updated(fieldName: string, value: any): void {
    (<JNDevicePropertyNodeModel>this.model).property = value;
  }

}
