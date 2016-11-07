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


export class JNLocationNodeEditorModel extends JNEditorModel {
  title: String = 'nodeset.JNRuleNode.nodename';
  buttons: IJNFormButton[];
  viewTemplate: String;
  formControls: { [fieldName: string]: IJNFormControl };
  depth = 1;
  locationTree: ILocation;

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
    this.locationTree = RuleApplication.instance.cacheContext.get(CACHE_LOCATION);
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

    return <JNLocationNodeModel>JNLocationNodeModel.deserialize({
      locationID: locationID,
      locationStr: locationStr
    });
  }

  protected updated(fieldName: string, value: any): void {
    let i = 0;
    while (value[i]) {
      i++;
    }
    this.depth = i + 1;
    (<ISelectSetInput>this.formControls['location'].input).set = this.buildSet(value);
  }

  buildSet(value) {
    let labels = ['楼号', '层号', '区域', '区块', '工位'];
    let tree = this.locationTree;
    let set = [];
    for (let i = 0; i < this.depth; i++) {
      let subLocations = tree;
      for (let j = 0; j < i; j++) {
        subLocations = subLocations.subLocations[value[j]];
      }
      if (!subLocations
        || !subLocations.subLocations
        || !Object.keys(subLocations.subLocations).length) break;

      set.push({
        label: labels[i],
        options: JNUtils.toArray(subLocations.subLocations).map((location) => {
          return {
            text: (<ILocation>location.value).location,
            value: (<ILocation>location.value).location
          };
        }),
        fieldName: i
      });
    }
    return set;
  }

}
