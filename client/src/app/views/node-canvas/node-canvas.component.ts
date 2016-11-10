import * as $ from 'jquery';
import 'jqueryui';

import { Directive, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { D3HelperService } from './../../externals/services/d3-helper/d3-helper.service';
import { JNFlow } from './../../core/models/jn-flow.type';

import { JNBaseNode } from './../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from './../../externals/nodes/device-type-node/device-type-node.type';
import { JNLocationNode } from './../../externals/nodes/location-node/location-node.type';

@Component({
  selector: 'jn-canvas',
  template: '<div id="chart" class="ui-droppable"><svg></svg></div>',
  styleUrls: ['./node-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NodeCanvasComponent implements OnInit {

  nodeFlow = new JNFlow();

  constructor(private d3Helper: D3HelperService) {
  }

  ngOnInit() {
    let self = this;
    $("#chart").droppable({
      accept: ".palette_node",
      drop: function (event, ui) {
        console.log('canvas drop.');
        let left = $(this).position().left;
        let node = self.nodeFlow.createNode(JNDeviceTypeNode, { position: { x: ui.position.left - left, y: ui.position.top } });
        node.position = { x: ui.position.left - left, y: ui.position.top };
        self.d3Helper.drawNode(self.nodeFlow.nodes);
      }
    });

    this.d3Helper.start();

    let node = this.nodeFlow.createNode(JNLocationNode, { position: { x: 200, y: 200 } });
    // let node2 = this.nodeFlow.createNode(JNDeviceTypeNode, { position: { x: 300, y: 200 } });
    // let node3 = this.nodeFlow.createNode(JNDeviceTypeNode, { position: { x: 400, y: 200 } });
    let a = 1;


    this.d3Helper.drawNode(this.nodeFlow.nodes);

    // this.d3Helper.drawLink(node2, node);
  }
}
