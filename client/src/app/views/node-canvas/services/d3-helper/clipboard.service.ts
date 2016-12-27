import { CanvasNode } from './canvas-node.type';
import { CanvasObject } from './canvas-object.type';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type';
import { JNFlow } from '../../../../core/models/jn-flow.type';

export class JNClipboard{

  private _flow: JNFlow;
  
  static factory(flow: JNFlow) {
    return new JNClipboard(flow);
  }  

  constructor(flow: JNFlow) {
    this._flow = flow;
  }

  private _originSelection: JNBaseNode[];

  copy(selections: CanvasObject[]) {
    this._originSelection = selections
      .filter(s => s instanceof CanvasNode)
      .map(s => <CanvasNode>s)
      .map(n=> n.node.duplicate());
  }

  paste() {
    let nodes = this._originSelection
      .map(n => {
        let _n = n.duplicate();
        this._flow.addNode(_n);
        return _n;
      });
    
    nodes.forEach((_n, i) => {
      let acceptedIndex = this._originSelection[i]
        .accepted
        .map(a => this._originSelection.indexOf(a))
        .filter(index => index > -1)
        .forEach((j) => {
          nodes[i].accept(nodes[j]);
        });
      
      _n.position = {
        x: _n.position.x + 20,
        y: _n.position.y + 20
      };
    });
    
    this._originSelection = nodes;
  }

}