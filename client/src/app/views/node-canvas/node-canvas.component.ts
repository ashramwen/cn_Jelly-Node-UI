import { Directive, OnInit, Component, ViewEncapsulation, Input, ElementRef, HostListener, SimpleChange, OnChanges, ViewChild } from '@angular/core';
import { JNFlow } from './../../core/models/jn-flow.type';
import { JNBaseNode } from './../../core/models/jn-base-node.type';
import { D3HelperService } from './services/d3-helper/d3-helper.service';
import { JNPaletteNode } from '../palette/interfaces/palette-node.type';
import { DropEvent } from '../../share/directives/drag-drop/components/droppable/drop-event.type';
import { Events, NODE_EVENTS } from '../../share/services/event.service';
import { JNApplication } from '../../share/services/application-core.service';
import * as d3 from 'd3';
import { EditStack } from './services/edit-stack.service';
import { JNUtils } from '../../share/util';
import { Subscriber, Observable } from 'rxjs';
import { JNKeyboardService, CANVAS_COMMANDS } from './services/keyboard.service';

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
  providers: [D3HelperService, EditStack, JNKeyboardService]
})
export class NodeCanvasComponent implements OnInit, OnChanges {
  @Input()
  nodeFlow: JNFlow;

  @ViewChild('chart')
  canvas: ElementRef;

  private _dragEnabled: boolean;
  private _commands: { keyCombo: string[]; command: any };
  
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
    private application: JNApplication,
    private editStack: EditStack,
    private keyboardService: JNKeyboardService
  ) { 
    this._dragEnabled = false;
  }

  ngOnInit() {
    let self = this;
    this.d3Helper.init(this.canvas.nativeElement);

    this.events.on(NODE_EVENTS.SELECTION_BEFORE_MOVED, this.onUserInput.bind(this));
    this.events.on(NODE_EVENTS.SELECTION_BEFORE_REMOVED, this.onUserInput.bind(this));
    this.events.on(NODE_EVENTS.NODE_BEFORE_ADDED, this.onUserInput.bind(this));
    this.events.on(NODE_EVENTS.NODE_BEFORE_LINKED, this.onUserInput.bind(this));
    this.events.on(NODE_EVENTS.NODE_BEFORE_CHANGED, this.onUserInput.bind(this));
    this.events.on(NODE_EVENTS.LINK_BEFORE_REMOVED, this.onUserInput.bind(this));
  }

  onItemDrop(e: DropEvent) {
    if (!this.nodeFlow) return;
    let position = {
      x: (e.nativeEvent.offsetX - e.offset.x) / this.currentScale,
      y: (e.nativeEvent.offsetY - e.offset.y) / this.currentScale
    };
    let nodeType = this.application.nodeTypeMapper[e.dragData.typeName];
    let property = e.dragData.property || {};
    Object.assign(property, { position: position });
    let node = this.nodeFlow.createNode(<any>nodeType, property);
    this.events.emit(NODE_EVENTS.NODE_BEFORE_ADDED, node);
    this.nodeFlow.addNode(node);
    this.addNode(node);
  }

  @HostListener('keydown', ['$event'])
  keydown(e: KeyboardEvent) {
    let command = this.keyboardService.keydown(e);
    if (!command) return;
    console.log(command);
    this.handleCommand(command.commandName);
  }

  @HostListener('keyup', ['$event'])
  keyup(e: KeyboardEvent) {
    let command = this.keyboardService.keyup(e);
    if (!command) return;
    console.log(command);
    this.handleCommand(command.commandName);
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
    if (this._dragEnabled) return;
    this.d3Helper.enableDrapMove();
    this._dragEnabled = true;
  }

  disableDragMove() {
    this.d3Helper.disableDrapMove();
    this._dragEnabled = false;
  }

  undo() {
    if (!this.editStack.undoable) return;
    let flow = this.editStack.undo();
    this.nodeFlow.loadData(flow.nodes);
    this.d3Helper.loadFlow(this.nodeFlow);
  }

  onUserInput() {
    this.d3Helper.drawNodes();
    this.editStack.do(this.nodeFlow.serialize());
    JNUtils.debug(this.editStack._doStack, this.editStack._undoStack);
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let flow: JNFlow = changes['nodeFlow'].currentValue;
    if (flow === changes['nodeFlow'].previousValue || !flow) return;
    this.d3Helper.loadFlow(flow);
  }

  private handleCommand(commandName: CANVAS_COMMANDS) {
    switch (commandName) {
      case CANVAS_COMMANDS.REMOVE:
        this.d3Helper.removeSelection();
        break;
      case CANVAS_COMMANDS.UNDO:
        this.undo();
        break;
      case CANVAS_COMMANDS.ENABLE_DRAG_MOVE:
        this.enableDragMove();
        break;
      case CANVAS_COMMANDS.DISABLED_DRAG_MOVE:
        this.disableDragMove();
        break;
    }
  }
}
