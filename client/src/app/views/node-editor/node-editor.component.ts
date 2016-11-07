import { Component, ViewContainerRef, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { ApplicationContextService } from '../../core/services';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { JNTemplateBuilder } from './services/template-builder.service';
import { JNControlLoader } from './services/control-loader.service';
import { JNTextControl, ITextInput } from './components/controls/text/text.component';
import { IJNFormControl } from './interfaces/form-control.interface';
import { IJNFormControlInput } from './interfaces/form-control-input.interface';
import { IRadioInput, JNRadioControl } from './components/controls/radio/radio.component';
import { JNEditorModel } from './interfaces/editor-model.type';
import { JNRuleNode } from '../../externals/nodes/rule-node/rule-node.type';
import { JNLocationNode } from '../../externals/nodes/location-node/location-node.type';
import { Events } from '../../core/services/event.service';
import { APP_READY } from '../../core/services/application-core.service';

@Component({
  selector: 'jn-node-editor',
  template: require('./node-editor.component.html'),
  styles: [require('./node-editor.component.scss')]
})
export class JNEditFormComponent implements OnInit {

  @Input()
  editorModel: JNEditorModel;

  private controls: IJNFormControl[] = [];
  private formGroup: FormGroup = new FormGroup({});

  constructor(
    private events: Events
  ) { }

  ngOnInit() {
    // let ruleNode = new JNRuleNode();
    // ruleNode.init({ ruleName: 'rule1', description: 'description', triggerWhen: 'TRUE_TO_FALSE' });
    let locationNode = new JNLocationNode();
    locationNode.init({ locationStr: ['08', '0801'] });
    this.events.on(APP_READY, () => {
      setTimeout(() => {
        this.editorModel = locationNode.createEditorModel();
        this.prepare();
      }, 50);
    });
  }

  prepare() {
    if (!this.editorModel) return;
    this.formGroup = this.editorModel.formGroup;
    this.controls = this.editorModel.controlsToArray();
  }

  submit() {
    console.log(this.editorModel.submit());
  }
}
