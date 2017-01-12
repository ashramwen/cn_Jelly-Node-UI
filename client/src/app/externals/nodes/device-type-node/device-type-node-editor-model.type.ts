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
import { JNEditFormComponent } from '../../../views/node-editor/node-editor.component';

@JNNodeEditor({
  title: 'nodeset.JNDeviceTypeNode.nodename',
  formControls: {
    typeName: {
      input: <ISelectInput>{
        label: 'terms.deviceType',
        options: []
      },
      controlType: JNSelectControl,
      $validators: []
    },
    things: {
      input: <ICheckTableInput>{
        label: 'nodeset.JNDeviceTypeNode.thingList',
        tableFields: [{
          displayName: 'ID',
          fieldName: 'thingID'
        }, {
          displayName: 'terms.thingID',
          fieldName: 'vendorThingID'
        }, {
          displayName: 'terms.location',
          fieldName: 'location'
        }],
        tableData: [],
        valueField: 'thingID'
      },
      controlType: JNCheckTableControl,
      $validators: []
    }
  }
})
export class JNDeviceTypeNodeEditorModel extends JNEditorModel {

  locations: string[];

  protected init() {
    let types = RuleApplication.instance.resources.$schema.types;
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    
    let schemaOptions = types
      .filter(type => {
        return !!schemas[type]
          && !!schemas[type].content
          && !!schemas[type].content.statesSchema;
      })
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

  protected formate() {
    return this.model;
  }

  protected updated(fieldName: string, value: any): void {
    if (fieldName === 'typeName') {
      let typeName = value;
      this.model.extends({
        typeName: typeName,
        things: []
      });
      if (!fieldName) return;
      if (!this.locations || !this.locations.length || !typeName) return;


      let loader = null;
      if (JNEditFormComponent.instance) {
        loader = JNEditFormComponent.instance.showLoader();
      }

      let tableData = [];
      DeviceTypeNodeService.instance
        .getThings(this.locations, typeName)
        .then((tableData: any) => {
          (<ICheckTableInput>this.getInput('things')).tableData = tableData;
          if (loader) {
            loader.dismiss();
          }
        }, () => {
          if (loader) {
            loader.dismiss();
          }
        });
    }

    if (fieldName === 'things') {
      this.model.extends({
        things: value
      });
    }
  }
}
