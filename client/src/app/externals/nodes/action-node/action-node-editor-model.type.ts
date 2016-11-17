import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { RuleApplication } from '../../rule-application-core';
import { JNUtils } from '../../../share/util';
import { ISchemaProperty, ISchema, ISchemaAction } from '../../resources/schema.type';
import { JNActionNodeModel } from './action-node-model.type';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import { JNActionNodeService } from './action-node.service';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNActionNode.nodename'
})
export class JNActionNodeEditorModel extends JNEditorModel {

  protected model: JNActionNodeModel;

  protected init() {
  }

  protected parse(data: JNActionNodeModel) {
    let schema = RuleApplication.instance.resources.$schema.schemas[data.typeName];
    let controls = JNActionNodeService.instance.generateControls(data.actionName, schema);
    this.buildControls(controls);
  }

  protected formate(): JNActionNodeModel {
    return <JNActionNodeModel>this.model;
  }

  protected updated(fieldName: string, value: any): void {
    if (fieldName !== 'actionName') {
      let _property = (<JNActionNodeModel>this.model)
        .properties
        .find(property => property.propertyName === fieldName);
      _property.propertyValue = value;
    } else {
      if (value === this.model.actionName) return;
      this.model.actionName = value;
      let schema = RuleApplication.instance.resources.$schema.schemas[this.model.typeName];
      let controls = JNActionNodeService.instance.generateControls(value, schema);
      this.buildControls(controls);
    }
  }
}
