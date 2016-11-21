import * as $ from 'jquery';
import 'jqueryui';

import { Directive, OnInit, Component, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import { D3HelperService } from './services';
import { JNFlow } from './../../core/models/jn-flow.type';

import { JNBaseNode } from './../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from './../../externals/nodes/device-type-node/device-type-node.type';
import { JNLocationNode } from './../../externals/nodes/location-node/location-node.type';
import { Events } from '../../core/services/event.service';

@Component({
  selector: 'jn-canvas',
  template: '<div id="chart" class="ui-droppable"><svg></svg></div>',
  styleUrls: ['./node-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NodeCanvasComponent implements OnInit {
  @Input()
  nodeFlow: JNFlow;
  canvas: Element;

  constructor(private d3Helper: D3HelperService, private elementRef: ElementRef, private events: Events) {
  }

  ngOnInit() {
    let self = this;
    $('#chart').droppable({
      accept: '.palette_node_group',
      drop: function (event, ui) {
        if (!self.nodeFlow) return;
        let {left, top} = $(self.canvas).position();

        let data = {
          position: {
            x: ui.position.left - left,
            y: ui.position.top - top
          }
        };
        let node = self.nodeFlow.createNode(ui.draggable.data('node').constructor, data);
        self.d3Helper.addNode();
        self.d3Helper.drawNode(self.nodeFlow.nodes);
      }
    });
    this.canvas = $(this.elementRef.nativeElement).find('svg')[0];
    this.d3Helper.init(this.canvas);
  }
}
