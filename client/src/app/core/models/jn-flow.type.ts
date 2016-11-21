import { JNBaseNode } from './jn-base-node.type';
import { INodeBody } from './interfaces/node-body.interface';
import { JNApplication } from '../services/application-core.service';

export class JNFlow {
  flowID: number;
  flowName: String;
  nodes: Array<JNBaseNode> = [];

  private _redoStack: Array<any> = [];
  private _undoStack: Array<any> = [];

  constructor() { }

  /**
   * @param  {JNBaseNode} nodeType
   * @desc create new node
   */
  createNode<T extends JNBaseNode>(nodeType: new() => T , data?) {
    let node = JNBaseNode.factory(nodeType, data);
    let _data;
    if (data) {
      if (!data.nodeID) {
        _data = {
          nodeID: this._generateNodeID()
        };
        Object.assign(_data, data);
      }
    } else {
      _data = { nodeID: this._generateNodeID() };
    }
    node.init(_data);
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

  loadData(data: INodeBody[]) {

    this.nodes = data.map(d => {
      let nodeType: typeof JNBaseNode = JNApplication.instance.nodeTypeMapper[d.type];
      let node: JNBaseNode = new (<any>nodeType);
      node.init(d);
      return node;
    });

    this.nodes.forEach((node) => {
      node.body.accepts
        .map((id) => {
          return this.nodes.find(n => n.body.nodeID === id);
        })
        .forEach((sourceNode) => {
          node.accept(sourceNode);
        });
    });
  }

  redo() {
  }

  undo() {
  }

  private _generateNodeID() {
    return new Date().getTime() * 10000 + Math.random() * 10000;
  }

}
