import { Directive, OnInit, Component, ViewEncapsulation, Input, ElementRef, HostListener, SimpleChange, OnChanges, ViewChild } from '@angular/core';
import { JNFlow } from './../../core/models/jn-flow.type';
import { JNBaseNode } from './../../core/models/jn-base-node.type';
import { D3HelperService } from './services/d3-helper/d3-helper.service';
import { JNPaletteNode } from '../palette/interfaces/palette-node.type';
import { DropEvent } from '../../share/directives/drag-drop/components/droppable/drop-event.type';
import { Events, NODE_EVENTS } from '../../share/services/event.service';
import { JNApplication } from '../../share/services/application-core.service';
import * as d3 from 'd3';

@Component({
  selector: 'jn-canvas',
  template: `
    <div id="chart" #chart droppable (onDrop)="onItemDrop($event)"></div>
  `,
  styles: [
    require('./node-canvas.component.scss')
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[tabindex]': '1'
  },
  providers: [D3HelperService]
})
export class NodeCanvasComponent implements OnInit, OnChanges {
  @Input()
  nodeFlow: JNFlow;

  @ViewChild('chart')
  canvas: ElementRef;

  private _dragEnabled: boolean;
  
  get currentScale() {
    return this.d3Helper.currentScale;
  }

  get dragEnabled() {
    return this._dragEnabled;
  }

  constructor(
    private d3Helper: D3HelperService,
    private elementRef: ElementRef,
    private events: Events,
    private application: JNApplication
  ) { 
    this._dragEnabled = false;
  }

  ngOnInit() {
    let self = this;
    this.d3Helper.init(this.canvas.nativeElement);
    this.events.on(NODE_EVENTS.NODE_CHANGED, this.d3Helper.drawNodes.bind(this.d3Helper));
  }

  onItemDrop(e: DropEvent) {
    let position = {
      x: (e.nativeEvent.offsetX - e.offset.x) / this.currentScale,
      y: (e.nativeEvent.offsetY - e.offset.y) / this.currentScale
    };
    let nodeType = this.application.nodeTypeMapper[e.dragData.typeName];
    let property = e.dragData.property || {};
    Object.assign(property, { position: position });
    let node = this.nodeFlow.createNode(<any>nodeType, property);
    this.addNode(node);
  }

  @HostListener('keydown', ['$event'])
  keydown(e) {
    this.d3Helper.keydown(e.key, e);
  }

  addNode(node: JNBaseNode) {
    this.d3Helper.addNode(node);
  }

  update() {
    this.d3Helper.updateNodes();
  }

  scale(s: number) {
    this.d3Helper.scale(s);
  }

  enableDragMove() {
    this.d3Helper.enableDrapMove();
    this._dragEnabled = true;
  }

  disableDragMove() {
    this.d3Helper.disableDrapMove();
    this._dragEnabled = false;
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let flow: JNFlow = changes['nodeFlow'].currentValue;
    if (flow === changes['nodeFlow'].previousValue || !flow) return;
    let nodes = flow.nodes;
    this.d3Helper.loadNodes(nodes);
  }
}
