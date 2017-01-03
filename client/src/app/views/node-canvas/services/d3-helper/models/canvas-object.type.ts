import * as d3 from 'd3';
import { SVGUtils } from '../utils';

export class CanvasObject {
  element: SVGSVGElement; // native SVG element
  error: { message: string }; // object error message
  width: number; // object width
  height: number; // object height
  x: number; // object offset left
  y: number; //object offset top

  constructor(private canvas: SVGSVGElement) {
  }
}