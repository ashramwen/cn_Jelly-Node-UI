import { JNBaseNode } from '../../../../core/models/jn-base-node.type';
import * as d3 from 'd3';

export class CanvasNode {
  node: JNBaseNode;
  x: number;
  y: number;
  inputs: number[] = [];
  outputs: number[] = [];
  element: any;

  get width(): number {
    let rect: any = d3.select(this.element)
      .select('rect').node();
    return rect.getBoundingClientRect().width;
  }

  constructor(node: JNBaseNode) {
    this.node = node;
    this.x = node.position.x;
    this.y = node.position.y;
  }
}
