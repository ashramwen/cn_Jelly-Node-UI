import { JNNodeException } from './node-exception.type';
import { JNBaseNode } from '../jn-base-node.type';

export class JNNodeUnconnectableException {
  messag: string = '';
  code: number = 101;

  constructor(node1: JNBaseNode, node2: JNBaseNode) {
    let a = new Error;
    let nodeType1 = <typeof JNBaseNode>node1.constructor;

    let types = nodeType1.accepts.map((type) => typeof type);

    this.messag = `target node only accepts:${types.join(',')}; but given type is ${typeof node2}`;
  }
}
