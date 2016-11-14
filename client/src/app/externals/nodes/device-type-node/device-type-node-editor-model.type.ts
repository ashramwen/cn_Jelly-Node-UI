import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { JNDeviceTypeNodeModel } from './device-type-node-model.type';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { FormControl } from '@angular/forms';
import { RuleApplication } from '../../rule-application-core';
import { ICheckTableInput, JNCheckTableControl } from '../../../views/node-editor/components/controls/check-table/check-table.component';
import { IThingRequest } from '../../resources/thing.type';
import { DeviceTypeNodeService } from './device-type-node.service';
import { JNNodeEditor } from '../../../core/models/node-editor-annotation';

@JNNodeEditor({
  title: 'nodeset.JNDeviceTypeNode.nodename',
  formControls: {
    typeName: {
      input: <ISelectInput>{
        label: '设备种类',
        options: []
      },
      controlType: JNSelectControl,
      $validators: [],
      formControl: new FormControl()
    },
    things: {
      input: <ICheckTableInput>{
        label: '设备选择列表',
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
  }
})
export class JNDeviceTypeNodeEditorModel extends JNEditorModel {

  locations: string[];

  protected init() {
    let types = RuleApplication.instance.resources.$schema.types;
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    
    let schemaOptions = types
      .filter(type => !!schemas[type])
      .map((type) => {
        return { value: type, text: schemas[type].content.statesSchema.title };
      });
    (<ISelectInput>this.getInput('typeName')).options = schemaOptions;
  }

  protected parse(data: JNDeviceTypeNodeModel) {
    this.setValue('typeName', data.typeName);
    this.setValue('things', data.things);
    this.locations = data.locations;
  }

  protected formate(): JNDeviceTypeNodeModel {
    return <JNDeviceTypeNodeModel> JNDeviceTypeNodeModel.deserialize(this.formGroup.value);
  }

  protected updated(fieldName: string, value: any): void {
    if (fieldName === 'typeName') {
      let typeName = value;
      if (!fieldName) return;
      if (!this.locations || !this.locations.length) return;

      let tableData = [];
      DeviceTypeNodeService.instance
        .getThings(this.locations, typeName)
        .then((tableData: any) => {
          (<ICheckTableInput>this.getInput('things')).tableData = tableData;
        });
    }
  }
}
