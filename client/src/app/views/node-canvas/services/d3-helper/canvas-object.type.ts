import * as d3 from 'd3';
import { SVGUtils } from './utils';

export class CanvasObject {
  element: SVGSVGElement;
  error: { message: string }; 
  width: number;
  height: number;
  x: number;
  y: number;

  constructor(private canvas: SVGSVGElement) {
  }
}