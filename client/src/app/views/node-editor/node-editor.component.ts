import {
  Component, ViewContainerRef, ViewChild,
  ElementRef, OnInit, Input, Output, OnChanges, SimpleChange,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';

import { JNTextControl, ITextInput } from './components/controls/text/text.component';
import { IJNFormControl } from './interfaces/form-control.interface';
import { IRadioInput, JNRadioControl } from './components/controls/radio/radio.component';
import { JNEditorModel } from './interfaces/editor-model.type';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { Subscription } from 'rxjs';
import { Events, NODE_EVENTS } from '../../share/services/event.service';
import { JNUtils } from '../../share/util';

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
  }

  public show(node: JNBaseNode) {
    this.targetNode = node;
    this.editorShown = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.editorModel = this.targetNode.createEditorModel();
    this.subscription = this.editorModel.viewModelChange.subscribe(() => {
      this.controls = this.editorModel.controlsToArray();
    });
    // this.editorModel = node.createEditorModel();
    this.prepare();
  }

  public hide() {
    this.targetNode = null;
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
    JNUtils.debug(result);
    this.events.emit(NODE_EVENTS.NODE_BEFORE_CHANGED, this.targetNode);
    this.targetNode.update(result);
    this.hide();
  }
}
