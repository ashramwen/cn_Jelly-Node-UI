import { JNBaseNode } from '../jn-base-node.type';
import { JNException } from './exception.type';

export class JNNodeUnconnectableException extends JNException{
  message: string = '';
  code: number = 101;

  constructor(node1: JNBaseNode, node2: JNBaseNode) {
    super();
    let a = new Error;
    let nodeType1 = <typeof JNBaseNode>node1.constructor;

    let types = nodeType1.accepts;

    this.message = `${(<typeof JNBaseNode>node1.constructor).title} node only accepts:${types.join(',')}; but given type is ${(<typeof JNBaseNode>node2.constructor).title}`;
  }
}
