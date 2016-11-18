import * as $ from 'jquery';
import 'jqueryui';

import { Directive, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { D3HelperService } from './services';
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

  nodeFlow: JNFlow;

  constructor(private d3Helper: D3HelperService) {
    this.nodeFlow = new JNFlow();
  }

  ngOnInit() {
    let self = this;
    $("#chart").droppable({
      accept: ".palette_node_group",
      drop: function (event, ui) {
        let left = $(this).position().left;
        let node = self.nodeFlow.createNode(ui.draggable.data('node').constructor, { position: { x: ui.position.left - left, y: ui.position.top } });
        self.d3Helper.addNode();
        self.d3Helper.drawNode(self.nodeFlow.nodes);
      }
    });

    this.d3Helper.init();
  }
}
