import * as $ from 'jquery';
import 'jqueryui';

import { Directive, OnInit, Component, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import { JNFlow } from './../../core/models/jn-flow.type';

import { JNBaseNode } from './../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from './../../externals/nodes/device-type-node/device-type-node.type';
import { JNLocationNode } from './../../externals/nodes/location-node/location-node.type';
import { Events } from '../../core/services/event.service';
import { D3HelperService } from './services/d3-helper/d3-helper.service';
import { JNPaletteNode } from '../palette/interfaces/palette-node.type';
import { JNApplication } from '../../core/services/application-core.service';

interface NodeDropEvent {
  nativeEvent: DragEvent;
  dragData: JNPaletteNode;
}

@Component({
  selector: 'jn-canvas',
  template: '<div id="chart" droppable (onDrop)="onItemDrop($event)"><svg></svg></div>',
  styleUrls: ['./node-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NodeCanvasComponent implements OnInit {
  @Input()
  nodeFlow: JNFlow;
  canvas: Element;

  constructor(
    private d3Helper: D3HelperService,
    private elementRef: ElementRef,
    private events: Events,
    private application: JNApplication) {}

  ngOnInit() {
    let self = this;
    /*
    $(this.elementRef.nativeElement).droppable({
      accept: '.palette-node-group',
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
    */
    this.canvas = $(this.elementRef.nativeElement).find('svg')[0];
    this.d3Helper.init(this.canvas);
  }

  onItemDrop(e: NodeDropEvent) {
    let {left, top} = $(this.elementRef.nativeElement).offset();
    let position = {
      x: e.nativeEvent.clientX - left,
      y: e.nativeEvent.clientY - top
    };
    let nodeType = this.application.nodeTypeMapper[e.dragData.typeName];
    let property = e.dragData.property || {};
    Object.assign(property, { position: position });
    let node = this.nodeFlow.createNode(<any>nodeType, property);
    this.d3Helper.drawNode(this.nodeFlow.nodes);
  }
}
