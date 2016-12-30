import * as d3 from 'd3';
import { CanvasObject } from './canvas-object.type';
import { JNBaseNode } from '../../../../../core/models';
import { SVGUtils } from '../utils';

export class CanvasNode extends CanvasObject {
  node: JNBaseNode;
  offset: { x: number; y: number; };

  /**
   * @override CanvasObject.width
   */
  get width() {
    let left = this.hasInput ? SVGUtils.getWith(this.element.querySelector('g.input rect')) / 2 : 0;
    let right = this.hasOutput ? SVGUtils.getWith(this.element.querySelector('g.output rect')) / 2 : 0;
    return ~~(SVGUtils.getWith(this.element.querySelector('rect.node')) + left + right);
  }

  /**
   * @override CanvasObject.height
   */
  get height() {
    return SVGUtils.getHeight(this.element.querySelector('rect.node'));
  }

  /**
   * @override CanvasObject.x
   */
  get x() {
    return SVGUtils.getTranslateX(this.element);
  }

  /**
   * @override CanvasObject.y
   */
  get y() {
    return SVGUtils.getTranslateY(this.element);
  }

  /**
   * @desc update node position after node dropped, clear drag offset
   */
  updatePosition() {
    let position = {
      x: this.node.position.x + this.offset.x,
      y: this.node.position.y + this.offset.y
    };
    this.node.position = position;
    this.offset.x = 0;
    this.offset.y = 0;
  }

  get icon(): string {
    return (<typeof JNBaseNode>this.node.constructor).icon;
  }

  /**
   * @desc has connected to any node
   */
  get connected(): boolean {
    return this.inputConnected || this.outputConnected;
  }

  /**
   * @desc input port has connections
   */
  get inputConnected(): boolean {
    return !!this.node.accepted.length;
  }

  /**
   * @desc output port has connections
   */
  get outputConnected() {
    return !!this.node.outputTo.length;
  }

  /**
   * @desc current position
   */
  get position() {
    let {x, y} = this.node.position;
    return {
      x: x + this.offset.x,
      y: y + this.offset.y
    };
  }

  /**
   * @override CanvasObject.error
   */
  get error() {
    let error = this.node.errors ? this.node.errors[0] : null;
    return error;
  }

  /**
   * @argument {CanvasNode} s source node
   * @return {boolean}
   * @desc description can be coonected with given node
   */
  connectable(s: CanvasNode) {
    return this.node.connectable(s.node);
  }

  constructor(node: JNBaseNode, canvas: SVGSVGElement) {
    super(canvas);
    this.node = node;
    this.offset = { x: 0, y: 0 };
  }

  /**
   * @desc has input port
   * @return {boolean} 
   */
  get hasInput(): boolean {
    let nodeType: typeof JNBaseNode = <typeof JNBaseNode>this.node.constructor;
    return nodeType.hasInput();
  }

  /**
   * @desc has output port
   * @return {boolean}
   */
  get hasOutput(): boolean {
    let nodeType: typeof JNBaseNode = <typeof JNBaseNode>this.node.constructor;
    return nodeType.hasOutput();
  }
}
