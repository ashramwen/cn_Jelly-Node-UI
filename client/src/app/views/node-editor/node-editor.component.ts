import {
  Component, ViewContainerRef, ViewChild,
  ElementRef, OnInit, Input, Output, OnChanges, SimpleChange,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';

import { ApplicationContextService } from '../../core/services';
import { JNTemplateBuilder } from './services/template-builder.service';
import { JNControlLoader } from './services/control-loader.service';
import { JNTextControl, ITextInput } from './components/controls/text/text.component';
import { IJNFormControl } from './interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from './components/controls/radio/radio.component';
import { JNEditorModel } from './interfaces/editor-model.type';
import { JNRuleNode } from '../../externals/nodes/rule-node/rule-node.type';
import { JNLocationNode } from '../../externals/nodes/location-node/location-node.type';
import { Events } from '../../core/services/event.service';
import { APP_READY } from '../../core/services/application-core.service';
import { JNDeviceTypeNode } from '../../externals/nodes/device-type-node/device-type-node.type';
import { JNConjunctionNode } from '../../externals/nodes/conjunction-node/conjunction-node.type';
import { JNTimeNode } from '../../externals/nodes/time-node/time-node.type';
import { JNActionNode } from '../../externals/nodes/action-node/action-node.type';
import { JNApiNode } from '../../externals/nodes/api-node/api-node.type';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jn-node-editor',
  template: require('./node-editor.component.html'),
  styles: [require('./node-editor.component.scss')]
})
export class JNEditFormComponent implements OnInit {

  private editorModel: JNEditorModel;
  private targetNode: JNBaseNode;
  private editorShown: boolean;

  private controls: IJNFormControl[] = [];
  private formGroup: FormGroup = new FormGroup({});
  private subscription: Subscription;

  constructor(
    private events: Events
  ) { }

  ngOnInit() {
    // let ruleNode = new JNRuleNode();
    // ruleNode.init({ ruleName: 'rule1', description: 'description', triggerWhen: 'TRUE_TO_FALSE' });
    // let locationNode = new JNLocationNode();
    // locationNode.init({ locationStr: ['08', '0801'] });
    // let node = new JNDeviceTypeNode;
    // node.init({ things: [5266], locations: ['08'], typeName: 'EnvironmentSensor' });
    // let node = new JNConjunctionNode();
    // node.init({conjunction: 'and'});
    /*
    let node = new JNConditionNode();
    node.init({
      thingType: 'AirCondition',
      conditions: [{
        property: 'Power',
        value: 0,
        operator: 'eq'
      }, {
        property: 'Temp',
        value: 20,
        operator: 'gte',
        aggregation: 'avg'
      }]
    });
    */
    // let node = new JNTimeNode();
    // node.init({timeType: 'schedule', cron: '0 9 * 3 ? 5', interval: 50, unit: 'day'});
    /*
    let node = new JNActionNode();
    node.init({
      actionName: 'turnPower',
      typeName: 'AirCondition',
      properties: null
    });
    */
    /*
    let node = new JNApiNode();
    node.init({
      apiName: 'api的名字',
      apiUrl: 'http://www.example.com',
      method: 'POST',
      header: `{
        "authorization": "Bearer super_token"
      }`,
      body: `{
        "id": 5425
      }`
    });
    */
  }

  public show(node: JNBaseNode) {
    this.targetNode = node;
    this.editorShown = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.events.on(APP_READY, () => {
      this.editorModel = this.targetNode.createEditorModel();
      this.subscription = this.editorModel.viewModelChange.subscribe(() => {
        this.controls = this.editorModel.controlsToArray();
      });
      // this.editorModel = node.createEditorModel();
      this.prepare();
    });
  }

  public hide() {
    this.editorShown = false;
    this.editorModel = null;
  }

  private prepare() {
    if (!this.editorModel) return;
    this.formGroup = this.editorModel.formGroup;
    this.controls = this.editorModel.controlsToArray();
  }

  private submit() {
    let result = this.editorModel.submit();
    this.targetNode.update(result);
    this.hideEditor();
  }

  private hideEditor() {
    this.editorShown = false;
  }
}
