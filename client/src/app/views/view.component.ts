import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { APP_READY } from '../share/services/application-core.service';
import { JNBaseNode } from '../core/models/jn-base-node.type';
import { JNFlow } from '../core/models/jn-flow.type';
import { AppEventListener } from '../share/services/event-listener.type';
import { JNEditFormComponent } from './node-editor/node-editor.component';
import { NodeCanvasComponent } from './node-canvas/node-canvas.component';
import { Events, NODE_EVENTS } from '../share/services/event.service';

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
export class JNViewComponent implements OnInit, OnDestroy {

  id: string;
  subs: Subscription;
  selectedNode: JNBaseNode;

  @Input()
  nodeFlow: JNFlow;
  nodeDeleteEventListener: AppEventListener;

  @ViewChild('nodeEditor')
  nodeEditor: JNEditFormComponent;

  @ViewChild('nodeCanvas')
  nodeCanvas: NodeCanvasComponent;

  constructor(
    private events: Events
  ) { }

  ngOnInit() {
    this.events.on('node_click', node => {
      console.log('node_click', node);
    });

    this.events.on('node_dblclick', node => {
      console.log('node_dblclick', node);
      this.openEditModal(node);
    });
  }

  protected initFlow() {
    this.nodeFlow.onChanges(() => {
      this.nodeCanvas.update();
    });
    this.nodeCanvas.update();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.nodeDeleteEventListener.destroy();
  }

  protected openEditModal(node: JNBaseNode) {
    this.nodeEditor.show(node);
  }

  protected hideEditor() {
    this.nodeEditor.hide();
  }
}
