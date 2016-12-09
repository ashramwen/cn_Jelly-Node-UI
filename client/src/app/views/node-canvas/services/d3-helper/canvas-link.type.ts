import { CanvasNode } from './canvas-node.type';
import { CanvasObject } from './canvas-object.type';

export class CanvasLink extends CanvasObject{
  source: CanvasNode;
  target: CanvasNode;
  element: SVGSVGElement;

  /**
   * @override CanvasObject.error
   */  
  get error() {
    return this.target.node.validateLinkWith(this.source.node);  
  }

  /**
   * @override CanvasObject.x
   */  
  get x() {
    let x1 = this.source.x + this.source.width;
    let x2 = this.target.x;
    return x1 < x2 ? x1 : x2;
  }
  
  /**
   * @override CanvasObject.y
   */
  get y() {
    let y1 = this.source.y + this.source.height / 2;
    let y2 = this.target.y + this.target.height / 2;
    return y1 < y2 ? y1: y2;
  }

  /**
   * @override CanvasObject.width
   */  
  get width() {
    return Math.abs(this.source.x + this.source.width - this.target.x);
  }

  /**
   * @override CanvasObject.height
   */  
  get height() {
    return Math.abs(this.source.y - this.target.y);
  }

  constructor(source: CanvasNode, target: CanvasNode, canvas: SVGSVGElement) {
    super(canvas);
    this.source = source;
    this.target = target;
  }
}