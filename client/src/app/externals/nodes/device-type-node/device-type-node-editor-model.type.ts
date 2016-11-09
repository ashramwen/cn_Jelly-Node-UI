import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { JNDeviceTypeNodeModel } from './device-type-node-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { FormControl } from '@angular/forms';
import { RuleApplication } from '../../rule-application-core';
import { ICheckTableInput, JNCheckTableControl } from '../../../views/node-editor/components/controls/check-table/check-table.component';
import { IThingRequest } from '../../resources/thing.type';

export class JNDeviceTypeNodeEditorModel extends JNEditorModel {

  title: String = 'nodeset.JNRuleNode.nodename';
  locations: string[];

  protected init() {
    let types = RuleApplication.instance.resources.$schema.types;
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let schemaOptions = types
      .filter(type => !!schemas[type])
      .map((type) => {
        return { value: type, text: schemas[type].content.statesSchema.title };
      });

    this.formControls = {
      typeName: {
        input: <ISelectInput>{
          label: '设备种类',
          options: schemaOptions
        },
        controlType: JNSelectControl,
        $validators: [],
        formControl: new FormControl()
      },
      things: {
        input: <ICheckTableInput>{
          label: '设备种类',
          tableFields: [{
            displayName: 'ID',
            fieldName: 'thingID'
          }, {
            displayName: '设备编号',
            fieldName: 'vendorThingID'
          }, {
            displayName: '位置',
            fieldName: 'location'
          }],
          tableData: [],
          valueField: 'thingID'
        },
        controlType: JNCheckTableControl,
        $validators: [],
        formControl: new FormControl()
      }
    };
  }

  protected parse(data: JNDeviceTypeNodeModel) {
    this.formControls['typeName'].formControl.setValue(data.typeName);
    this.locations = data.locations;
    this.formControls['things'].formControl.setValue(data.things);
  }

  protected formate(): JNDeviceTypeNodeModel {
    return <JNDeviceTypeNodeModel> JNDeviceTypeNodeModel.deserialize(this.formGroup.value);
  }

  protected updated(fieldName: string, value: any): void {
    if (fieldName === 'typeName') {
      if (!fieldName) return;
      if (!this.locations || !this.locations.length) return;

      let tableData = [];
      let input: ICheckTableInput = <ICheckTableInput>this.formControls['things'].input;
      let promises =this.locations.map((location) => {
        let requestParam = {
          type: value,
          locationPrefix: location,
          includeSubLevel: true
        };

        return RuleApplication.instance.resources.$thing.query(requestParam, (data) => {
          data.forEach((row) => {
            row['location'] = row.vendorThingID;
            tableData.push(row);
          });
        }).$observable.toPromise();
      });

      Promise.all(promises).then(() => {
        this.formControls['things'].input['tableData'] = tableData;
      });
    }
  }
}
