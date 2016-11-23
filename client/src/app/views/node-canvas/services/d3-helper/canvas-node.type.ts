import { JNBaseNode } from '../../../../core/models/jn-base-node.type';

export class CanvasNode {
  node: JNBaseNode;
  x: number;
  y: number;
  width: number;
  inputs: number[] = [];
  outputs: number[] = [];
  element: any;

  constructor(node: JNBaseNode) {
    this.node = node;
    this.x = node.position.x;
    this.y = node.position.y;
  }
}
