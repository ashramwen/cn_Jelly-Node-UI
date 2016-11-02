import { JNDeviceTypeNode } from './../../../externals/nodes/device-type-node/device-type-node.type';
import { JNLocationNode } from './../../../externals/nodes/location-node/location-node.type';
import { D3HelperService } from './../../../externals/services/d3-helper/d3-helper.service';
import { JNFlow } from './../../../core/models/jn-flow.type';
import { NodeCanvasComponent } from './../../node-canvas/node-canvas.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-flow-detail',
  templateUrl: './flow-detail.component.html',
  styleUrls: ['./flow-detail.component.scss']
})
export class FlowDetailComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private d3Helper: D3HelperService) { }

  id: string;
  subs: Subscription;

  ngOnInit() {
    this.subs = this.route.params.subscribe(params => this.id = params['id']);
    this.d3Helper.start();

    let nodeFlow = new JNFlow();
    let node = nodeFlow.createNode(JNLocationNode);
    node.position = { x: 200, y: 200 };
    let node2 = nodeFlow.createNode(JNDeviceTypeNode);
    node2.position = { x: 100, y: 100 };
    node2.accept(node);
    this.d3Helper.drawNode(nodeFlow.nodes);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
