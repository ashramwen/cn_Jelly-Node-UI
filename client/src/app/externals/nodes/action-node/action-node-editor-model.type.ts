import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { FormControl } from '@angular/forms';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { RuleApplication } from '../../rule-application-core';
import { JNUtils } from '../../../share/util';
import { ISchemaProperty } from '../../resources/schema.type';
import { JNActionNodeModel } from './action-node-model.type';
import { JNFormControl } from '../../../views/node-editor/components/control.component';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';
import {
  JNTextAreaControl,
  ITextareaInput
} from '../../../views/node-editor/components/controls/textarea/textarea.component';

@JNNodeEditor({
  title: 'nodeset.JNActionNode.nodename'
})
export class JNActionNodeEditorModel extends JNEditorModel {


  protected init() {
  }

  protected parse(data: JNActionNodeModel) {
    let action = RuleApplication.instance.resources.$schema.schemas[data.typeName].content.actions[data.actionName];
    let formControls = this.generateControls(action.in.properties);
    JNUtils.toArray<IJNFormControl>(formControls)
      .forEach(r => {
        let fieldName = r.key;
        let formControl = r.value;
        formControl.model = data.properties
          .find(property => property.propertyName === fieldName)
          .propertyValue;
      });
    this.buildControls(formControls);
  }

  protected formate(): JNActionNodeModel {
    return <JNActionNodeModel>this.model;
  }

  protected updated(fieldName: string, value: any): void {
    let _property = (<JNActionNodeModel>this.model)
      .properties
      .find(property => property.propertyName === fieldName);
    _property.propertyValue = value;
  }

  private generateControls(properties: {[key: string]: ISchemaProperty}) {
    let controls: { [fieldName: string]: IJNFormControl } = {};
    JNUtils.toArray<ISchemaProperty>(properties)
      .forEach((r) => {
        let propertyName = r.key;
        let property = r.value;
        controls[propertyName] = this.getControl(property, propertyName);
      });
    return controls;
  }

  private getControl(property: ISchemaProperty, propertyName: string): IJNFormControl {
    if (property.enum && Object.keys(property.enum).length) {
      return {
        input: <ISelectInput>{
          label: property.displayNameCN,
          options: JNUtils.toArray(property.enum)
            .map(r => {
              return {
                value: r.value,
                text: r.key
              };
            })
        },
        controlType: JNSelectControl
      };
    }
    return {
      input: <ITextInput>{
        label: property.displayNameCN,
        maxLength: 0,
        min: property.minimum,
        max: property.maximum
      },
      controlType: JNTextControl,
      $validators: [{
        errorName: propertyName,
        msg: `最大值不能大于${property.maximum}`,
        validator: (fc: FormControl) => {
          return new Promise((resolve) => {
            if (fc.value && fc.value > property.maximum) {
              resolve(false);
            }
            resolve(true);
          });
        }
      }, {
        errorName: propertyName,
        msg: `最小值不能小于${property.minimum}`,
        validator: (fc: FormControl) => {
          return new Promise((resolve) => {
            if (fc.value && fc.value > property.minimum) {
              resolve(false);
            }
            resolve(true);
          });
        }
      }]
    };
  }
}
