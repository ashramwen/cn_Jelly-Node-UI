import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../../../externals/nodes/device-type-node/device-type-node.type';
import { JNRuleNode } from '../../../externals/nodes/rule-node/rule-node.type';
import { JNDevicePropertyNode } from '../../../externals/nodes/device-property-node/device-property-node.type';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { Events } from '../../../core/services/event.service';
import { JNEditFormComponent } from '../../node-editor/node-editor.component';

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

  @ViewChild('')
  nodeEditor: JNEditFormComponent;

  constructor(private router: Router, private route: ActivatedRoute, private events: Events) {
  }

  ngOnInit() {
    this.subs = this.route.params.subscribe(params => this.id = params['id']);

    this.events.on('node_click', node => {
      console.log('node_click', node);
    });

    this.events.on('node_dblclick', node => {
      console.log('node_dblclick', node);
      this.openEditModal(node);
    });

    this.nodeFlow = new JNFlow();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  openEditModal(node: JNBaseNode) {
    this.nodeEditor.show(node);
  }

  hideEditor() {
    this.nodeEditor.hide();
  }

}
