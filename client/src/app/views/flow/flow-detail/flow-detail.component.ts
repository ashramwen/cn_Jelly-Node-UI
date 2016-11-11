import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../../../externals/nodes/device-type-node/device-type-node.type';
import { JNRuleNode } from '../../../externals/nodes/rule-node/rule-node.type';

@Component({
  selector: 'app-flow-detail',
  templateUrl: './flow-detail.component.html',
  styleUrls: ['./flow-detail.component.scss']
})
export class FlowDetailComponent implements OnInit, OnDestroy {

  id: string;
  subs: Subscription;
  selectedNode: JNBaseNode;
  editorShown: boolean;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.editorShown = true;
  }


  ngOnInit() {
    this.selectedNode = new JNRuleNode;
    this.selectedNode.init({ });
    this.subs = this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  openEditModal() {
    this.editorShown = true;
  }

  hideEditor() {
    this.editorShown = false;
  }

}
