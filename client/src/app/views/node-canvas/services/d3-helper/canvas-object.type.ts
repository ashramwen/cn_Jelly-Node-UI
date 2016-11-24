import * as d3 from 'd3';

export class CanvasObject {
  element: SVGSVGElement;

  constructor(private canvas: SVGSVGElement) {
  }

  get width() {
    return this.element.getBoundingClientRect().width;
  }

  get height() {
    return this.element.getBoundingClientRect().height;
  }

  get x() {
    return this.element.getBoundingClientRect().left
      - this.canvas.getBoundingClientRect().left;
  }
  
  get y() {
    return this.element.getBoundingClientRect().top
      - this.canvas.getBoundingClientRect().top;
  }
}