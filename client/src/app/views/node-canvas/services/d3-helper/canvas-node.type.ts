import { JNBaseNode } from '../../../../core/models/jn-base-node.type';
import * as d3 from 'd3';
import { CanvasObject } from './canvas-object.type';
import { JNUtils } from '../../../../share/util';
import { SVGUtils } from './utils';

export class CanvasNode extends CanvasObject{
  node: JNBaseNode;

  get width() {
    let left = this.hasInput ? SVGUtils.getWith(this.element.querySelector('g.input rect')) / 2 : 0;
    let right = this.hasOutput ? SVGUtils.getWith(this.element.querySelector('g.output rect')) / 2 : 0;
    return ~~(SVGUtils.getWith(this.element.querySelector('rect.node')) + left + right);
  }

  get height() {
    return SVGUtils.getHeight(this.element.querySelector('rect.node'));
  }

  get x() {
    return SVGUtils.getTranslateX(this.element)
  }
  
  get y() {
    return SVGUtils.getTranslateY(this.element)
  }

  set position(position: { x: number, y: number }) {
    this.node.position = position;
  }

  get icon() {
    return (<typeof JNBaseNode>this.node.constructor).icon;
  }

  get connected() {
    return this.inputConnected || this.outputConnected;
  }

  get inputConnected() {
    return !!this.node.accepted.length;
  }

  get outputConnected() {
    return !!this.node.outputTo.length;
  }

  get position() {
    return this.node.position;
  }

  get error() {
    let error = this.node.errors ? this.node.errors[0] : null;
    return error;
  }

  connectable(s: CanvasNode) {
    return this.node.connectable(s.node);
  }

  constructor(node: JNBaseNode, canvas: SVGSVGElement) {
    super(canvas);
    this.node = node;
  }

  get hasInput() :boolean{
    let nodeType: typeof JNBaseNode = <typeof JNBaseNode>this.node.constructor;
    return nodeType.hasInput();
  }

  get hasOutput(): boolean {
    let nodeType: typeof JNBaseNode = <typeof JNBaseNode>this.node.constructor;
    return nodeType.hasOutput();
  }
}
