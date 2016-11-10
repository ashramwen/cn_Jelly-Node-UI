import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IJNFormButton } from '../../../views/node-editor/interfaces/button';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { JNLocationNodeModel } from './location-node-model.type';
import { JNTextControl, ITextInput } from '../../../views/node-editor/components/controls/text/text.component';
import { FormControl } from '@angular/forms';
import { IRadioInput, JNRadioControl } from '../../../views/node-editor/components/controls/radio/radio.component';
import { ITextareaInput, JNTextAreaControl } from '../../../views/node-editor/components/controls/textarea/textarea.component';
import { ISelectInput, JNSelectControl } from '../../../views/node-editor/components/controls/select/select.component';
import { RuleApplication } from '../../rule-application-core';
import { CACHE_LOCATION, ILocation } from '../../resources/location.type';
import { JNUtils } from '../../../share/util';
import { ISelectSetInput, JNSelectSetControl } from '../../../views/node-editor/components/controls/select-set/select-set.component';
import { Input } from '@angular/core';
import { LocationNodeService } from './location-node.service';


export class JNLocationNodeEditorModel extends JNEditorModel {
  title: String = 'nodeset.JNRuleNode.nodename';
  buttons: IJNFormButton[];
  viewTemplate: String;
  formControls: { [fieldName: string]: IJNFormControl };
  depth = 1;

  protected init() {
    this.formControls = {
      location: {
        input: <ISelectSetInput>{
          set: [],
          label: '位置'
        },
        controlType: JNSelectSetControl,
        $validators: [],
        formControl: new FormControl()
      }
    };
  }

  protected parse(data: JNLocationNodeModel) {
    this.depth = data.locationStr.length + 1;
    this.setValue('location', data.locationStr);
  }

  protected formate(): JNLocationNodeModel {
    let locationStr = [];
    let locationID = null;

    let i = 0;
    while (this.getValue('location')[i]) {
      locationStr.push(this.getValue('location')[i]);
      i++;
    }

    if (locationStr.length) {
      locationID = locationStr[i - 1];
    }

    let model: JNLocationNodeModel = <JNLocationNodeModel>this.model;
    model.locationID = locationID;
    model.locationStr = model.locationStr;

    return model;
  }

  protected updated(fieldName: string, value: any): void {
    let i = 0;
    while (value[i]) {
      i++;
    }
    this.depth = i + 1;
    (<ISelectSetInput>this.formControls['location'].input).set
      = LocationNodeService.instance.buildSet(value, this.depth);
  }

}
