import { JNBaseNode } from '../../../../core/models/jn-base-node.type';
import * as d3 from 'd3';
import { CanvasObject } from './canvas-object.type';
import { JNUtils } from '../../../../share/util';

export class CanvasNode extends CanvasObject{
  node: JNBaseNode;
  inputs: number[] = [];
  outputs: number[] = [];

  set position(position: { x: number, y: number }) {
    this.node.position = position;
  }

  get position() {
    return this.node.position;
  }

  constructor(node: JNBaseNode, canvas: SVGSVGElement) {
    super(canvas);
    this.node = node;
  }
}
