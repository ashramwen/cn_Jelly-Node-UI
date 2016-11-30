import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../../../externals/nodes/device-type-node/device-type-node.type';
import { JNRuleNode } from '../../../externals/nodes/rule-node/rule-node.type';
import { JNDevicePropertyNode } from '../../../externals/nodes/device-property-node/device-property-node.type';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { Events, NODE_EVENTS } from '../../../core/services/event.service';
import { JNEditFormComponent } from '../../node-editor/node-editor.component';
import { NodeCanvasComponent } from '../../node-canvas/node-canvas.component';
import { AppEventListener } from '../../../core/services/event-listener.type';
import { FlowDetailService } from './flow-detail.service';
import { APP_READY } from '../../../core/services/application-core.service';

@Component({
  selector: 'app-flow-detail',
  templateUrl: './flow-detail.component.html',
  styleUrls: ['./flow-detail.component.scss']
})
export class FlowDetailComponent implements OnInit, OnDestroy {

  id: string;
  subs: Subscription;
  selectedNode: JNBaseNode;
  nodeFlow: JNFlow;
  nodeDeleteEventListener: AppEventListener;

  @ViewChild('nodeEditor')
  nodeEditor: JNEditFormComponent;

  @ViewChild('nodeCanvas')
  nodeCanvas: NodeCanvasComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private events: Events,
    private flowDetailService: FlowDetailService
  ) { }

  ngOnInit() {
    this.events.on(APP_READY, () => {
      this.subs = this.route.params.subscribe(params => {
        this.flowDetailService.getFlow(params['id'])
          .then((flow) => {
            this.nodeFlow = flow;
            this.initFlow();
          });
      });
    });

    this.events.on('node_click', node => {
      console.log('node_click', node);
    });

    this.events.on('node_dblclick', node => {
      console.log('node_dblclick', node);
      this.openEditModal(node);
    });

    this.nodeDeleteEventListener = this.events.on(NODE_EVENTS.NODE_DELETE, this.removeNode.bind(this));
    this.events.on(NODE_EVENTS.LINK_DELETE, this.removeLink.bind(this));
  }

  initFlow() {
    this.nodeFlow.onChanges(() => {
      this.nodeCanvas.update();
    });
    this.nodeCanvas.update();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.nodeDeleteEventListener.destroy();
  }

  openEditModal(node: JNBaseNode) {
    this.nodeEditor.show(node);
  }

  hideEditor() {
    this.nodeEditor.hide();
  }

  removeNode(node: JNBaseNode) {
    this.nodeFlow.removeNode(node);
  }

  removeLink(d: {source: JNBaseNode, target: JNBaseNode}) {
    this.nodeFlow.removeLink(d);
  }

  submit() {
    this.flowDetailService.saveFlow(this.nodeFlow);
  }  
}
