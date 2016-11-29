import { CanvasNode } from './canvas-node.type';
import { CanvasObject } from './canvas-object.type';

export class CanvasLink extends CanvasObject{
  source: CanvasNode;
  target: CanvasNode;
  element: SVGSVGElement;
    
  get error() {
    return this.target.node.validateLinkWith(this.source.node);  
  }

  constructor(source: CanvasNode, target: CanvasNode, canvas: SVGSVGElement) {
    super(canvas);
    this.source = source;
    this.target = target;
  }
}