import { JNBaseNode } from './jn-base-node.type';

export class JNFlow {
  flowID: number;
  nodes: Array<JNBaseNode> = [];

  private _redoStack: Array<any> = [];
  private _undoStack: Array<any> = [];

  constructor() { }

  /**
   * @param  {JNBaseNode} nodeType
   * @desc create new node
   */
  createNode<T extends JNBaseNode>(nodeType: { new(): T }, data?) {
    let node = new nodeType();
    if (data) {
      node.init(data);
    } else {
      node.init({ nodeID: this._generateNodeID() });
    }
    this.nodes.push(node);

    return node;
  }

  /**
   * @param  {JNBaseNode} node
   * @desc delete existing node
   */
  deleteNode(node: JNBaseNode) {
    if (this.nodes.indexOf(node) > -1) {
      this.nodes.splice(this.nodes.indexOf(node), 1);
    }
  }

  redo() {
  }

  undo() {
  }

  private _generateNodeID() {
    return new Date().getTime() * 10000 + Math.random() * 10000;
  }

}
