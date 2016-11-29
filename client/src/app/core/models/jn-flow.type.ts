import { JNBaseNode } from './jn-base-node.type';
import { INodeBody } from './interfaces/node-body.interface';
import { JNApplication } from '../services/application-core.service';
import { SyncEvent } from 'ts-events';
import { JNUtils } from '../../share/util';

export class JNFlow {
  flowID: number;
  flowName: String;
  nodes: Array<JNBaseNode> = [];

  private _redoStack: Array<any> = [];
  private _undoStack: Array<any> = [];
  private _flowChange: SyncEvent<JNBaseNode>;

  constructor() { 
    this._flowChange = new SyncEvent<JNBaseNode>();
  }

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
    this.initNode(node);
    this.nodes.push(node);

    return node;
  }

  /**
   * @param  {JNBaseNode} node
   * @desc delete existing node
   */
  removeNode(node: JNBaseNode) {
    if (this.nodes.indexOf(node) > -1) {
      JNUtils.removeItem(this.nodes, node);
      node.remove();
    }
  }

  removeLink(d: { source: JNBaseNode, target: JNBaseNode }) {
    d.target.reject(d.source);
  }

  loadData(data: INodeBody[]) {

    this.nodes = data
      .map(d => {
        let nodeType: typeof JNBaseNode = JNApplication.instance.nodeTypeMapper[d.type];
        let node: JNBaseNode = new (<any>nodeType);
        node.init(d);
        return node;
      });
    
    this.nodes
      .forEach((n) => {
        this.initNode(n);
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

  initNode(node: JNBaseNode) {
    node.onChanges(() => { this.whenNodeUpdated(node); });
  }

  public redo() {
  }

  public undo() {
  }

  public onChanges(cb: any) {
    return this._flowChange.attach(cb);
  }

  private _generateNodeID() {
    return new Date().getTime() * 10000 + Math.random() * 10000;
  }

  private whenNodeUpdated(node: JNBaseNode) {
    this._flowChange.post(node);
    console.log(node);
  }
}
