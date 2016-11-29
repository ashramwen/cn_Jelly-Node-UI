import * as $ from 'jquery';

import { Directive, OnInit, Component, ViewEncapsulation, Input, ElementRef, HostListener } from '@angular/core';
import { JNFlow } from './../../core/models/jn-flow.type';

import { JNBaseNode } from './../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from './../../externals/nodes/device-type-node/device-type-node.type';
import { JNLocationNode } from './../../externals/nodes/location-node/location-node.type';
import { Events, NODE_EVENTS } from '../../core/services/event.service';
import { D3HelperService } from './services/d3-helper/d3-helper.service';
import { JNPaletteNode } from '../palette/interfaces/palette-node.type';
import { JNApplication } from '../../core/services/application-core.service';
import { en } from '../../../../dist/assets/i18n/en';
import { DropEvent } from '../../share/directives/drag-drop/components/droppable/drop-event.type';

@Component({
  selector: 'jn-canvas',
  template: '<div id="chart" droppable (onDrop)="onItemDrop($event)"></div>',
  styleUrls: ['./node-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[tabindex]': '1'
  },
  providers: [D3HelperService]
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
    this.canvas = this.elementRef.nativeElement.querySelector('#chart');
    this.d3Helper.init(this.canvas);
    this.events.on(NODE_EVENTS.NODE_CHANGED, this.d3Helper.drawNodes.bind(this.d3Helper));
  }

  onItemDrop(e: DropEvent) {
    let position = {
      x: e.nativeEvent.offsetX - e.offset.x,
      y: e.nativeEvent.offsetY - e.offset.y
    };
    let nodeType = this.application.nodeTypeMapper[e.dragData.typeName];
    let property = e.dragData.property || {};
    Object.assign(property, { position: position });
    let node = this.nodeFlow.createNode(<any>nodeType, property);
    this.d3Helper.addNode(node);
  }

  @HostListener('keydown', ['$event'])
  keydown(e) {
    this.d3Helper.keydown(e.key, e);
  }

  update() {
    this.d3Helper.updateNodes();
  }
}
