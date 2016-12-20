import {
  Component, ViewContainerRef, ViewChild,
  ElementRef, OnInit, Input, Output, OnChanges, SimpleChange,
  EventEmitter, trigger, state, style, transition, animate, ViewEncapsulation
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
import { JNLoader } from '../../share/modules/loader/services/loader.service';

@Component({
  selector: 'jn-node-editor',
  template: require('./node-editor.component.html'),
  styles: [require('./node-editor.component.scss')],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('editorState', [
      state('inactive', style({
        display: 'none'
      })),
      state('active',   style({
        display: 'block'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]),
    trigger('backDropState', [
      state('inactive', style({
        opacity: '0'
      })),
      state('active',   style({
        opacity: '0.3'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]),
    trigger('contentState', [
      state('inactive', style({
        right: '-350px'
      })),
      state('active',   style({
        right: '0px'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]

})
export class JNEditFormComponent implements OnInit {

  static instance: JNEditFormComponent;

  private editorModel: JNEditorModel;
  private targetNode: JNBaseNode;
  private editorShown: boolean;

  private backDropState: 'active' | 'inactive';
  private contentState: 'active' | 'inactive';
  private editorState: 'active' | 'inactive';

  private controls: IJNFormControl[] = [];
  private formGroup: FormGroup = new FormGroup({});
  private subscription: Subscription;

  @ViewChild('editorContent', { read: ViewContainerRef })
  private editorContent: ViewContainerRef;

  constructor(
    private events: Events,
    private loader: JNLoader
  ) { 
    this.backDropState = 'inactive';
    this.contentState = 'inactive';
    this.editorState = 'inactive';
    JNEditFormComponent.instance = this;
  }

  ngOnInit() {
  }

  public show(node: JNBaseNode) {
    this.targetNode = node;
    this.editorShown = true;
    this.backDropState = 'active';
    this.contentState = 'active';
    this.editorState = 'active';
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
    this.backDropState = 'inactive';
    this.contentState = 'inactive';
    this.editorState = 'inactive';
  }

  public showLoader() {
    return this.loader.showLoader(this.editorContent);
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
