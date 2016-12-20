import { Component, OnInit, OnDestroy, ViewChild, Input, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { APP_READY } from '../share/services/application-core.service';
import { JNBaseNode } from '../core/models/jn-base-node.type';
import { JNFlow } from '../core/models/jn-flow.type';
import { AppEventListener } from '../share/services/event-listener.type';
import { JNEditFormComponent } from './node-editor/node-editor.component';
import { NodeCanvasComponent } from './node-canvas/node-canvas.component';
import { Events, NODE_EVENTS } from '../share/services/event.service';
import { JNLoader } from '../share/modules/loader/services/loader.service';

@Component({
  selector: 'jn-view',
  templateUrl: './view.component.html',
  styles: [
    require('./view.component.scss'),
    `
      :host{
        display: block;
        height: 100%;
      }
    `
  ]
})
export class JNViewComponent implements OnInit, OnDestroy, AfterViewInit {

  id: string;
  selectedNode: JNBaseNode;

  @Input()
  nodeFlow: JNFlow;
  nodeDbClickEventListener: AppEventListener;

  @ViewChild('nodeEditor')
  nodeEditor: JNEditFormComponent;

  @ViewChild('nodeCanvas')
  nodeCanvas: NodeCanvasComponent;

  @ViewChild('viewBody', { read: ViewContainerRef })
  private viewBody: ViewContainerRef;

  constructor(
    private events: Events,
    private loader: JNLoader
  ) { }

  ngOnInit() {
    this.nodeDbClickEventListener = this.events.on('node_dblclick', node => {
      this.openEditModal(node);
    });    
  }

  ngAfterViewInit() {
    let loader = this.loader.showLoader(this.viewBody);
    this.events.on(APP_READY, loader.dismiss);
  }

  protected initFlow() {
    this.nodeFlow.onChanges(() => {
      this.nodeCanvas.update();
    });
    this.nodeCanvas.update();
  }

  ngOnDestroy() {
    this.nodeDbClickEventListener.destroy();
  }

  protected openEditModal(node: JNBaseNode) {
    this.nodeEditor.show(node);
  }

  protected hideEditor() {
    this.nodeEditor.hide();
  }
}
