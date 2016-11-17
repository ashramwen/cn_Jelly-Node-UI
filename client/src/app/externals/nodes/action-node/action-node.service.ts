import { ISchema, ISchemaProperty, ISchemaAction } from '../../resources/schema.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { JNUtils } from '../../../share/util';
import { ITextInput, JNTextControl } from '../../../views/node-editor/components/controls/text/text.component';
import { FormControl } from '@angular/forms';

export class JNActionNodeService {
  static instance: JNActionNodeService = new JNActionNodeService;

  public generateControls(action: string, schema: ISchema) {
    let controls: { [key: string]: IJNFormControl } = {};
    let actionControl = this.generateActionControl(action, schema);
    Object.assign(controls, actionControl);
    if (action && schema.content.actions[action]
      && schema.content.actions[action].in
      && schema.content.actions[action].in.properties) {
      let propertyControls = this.generatePropertyControls(schema.content.actions[action].in.properties);
      Object.assign(controls, propertyControls);
    }

    return controls;
  }

  public generateActionControl(actionName: string, schema: ISchema): {[key: string]: IJNFormControl} {
    return {
      actionName: {
        input: <ISelectInput>{
          label: '设备行为',
          options: JNUtils.toArray<ISchemaAction>(schema.content.actions)
            .map(pair => {
              return { text: pair.value.displayNameCN, value: pair.key };
            })
        },
        model: actionName,
        controlType: JNSelectControl
      }
    };
  }

  public generatePropertyControls(properties: {[key: string]: ISchemaProperty}) {
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
