import { CanvasNode } from './canvas-node.type';
import { CanvasObject } from './canvas-object.type';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type';
import { JNFlow } from '../../../../core/models/jn-flow.type';
import { CanvasLink } from './canvas-link.type';
import { D3HelperService } from './d3-helper.service';

const PASTE_OFFSET = {
  x: 30,
  y: 30
};

export class JNClipboard{

  private _canvas: D3HelperService;
  private _originSelectedNodes: JNBaseNode[];
  private _originSelectedLinks: { source: number; target: number }[];
  
  static factory(canvas: D3HelperService) {
    return new JNClipboard(canvas);
  }  

  constructor(canvas: D3HelperService) {
    this._canvas = canvas;
  }

  public copy(selections: CanvasObject[]) {
    let selectedNodes = selections
      .filter(s => s instanceof CanvasNode)
      .map(s => <CanvasNode>s);
    
    this._originSelectedLinks = selections
      .filter(l => l instanceof CanvasLink)
      .map((l: CanvasLink) => {
        return {
          source: selectedNodes.indexOf(l.source),
          target: selectedNodes.indexOf(l.target)
        };
      })
      .filter(l => l.source > -1 && l.target > -1);
    
    this._originSelectedNodes = selectedNodes
      .map(n => n.node.duplicate());
  }

  public paste(): CanvasObject[] {
    let nodes = this._originSelectedNodes
      .map(n => {
        let _n = n.duplicate();
        _n.position = {
          x: _n.position.x + PASTE_OFFSET.x,
          y: _n.position.y + PASTE_OFFSET.y
        };
        _n = this._canvas.flow.createNode(<new () => JNBaseNode>_n.constructor, _n.body);
        this._canvas.flow.addNode(_n);
        let canvasNode = this._canvas.addNode(_n);
        return canvasNode;
      });

    let links = this._originSelectedLinks
      .map((l) => {
        nodes[l.target].node.accept(nodes[l.source].node);
        return this._canvas.addLink(nodes[l.source], nodes[l.target]);
      });
    
    this._originSelectedNodes = nodes.map(n => n.node.duplicate());

    let result: CanvasObject[] = [];
    result = result
      .concat(nodes)
      .concat(links);
    
    return result;
  }

}