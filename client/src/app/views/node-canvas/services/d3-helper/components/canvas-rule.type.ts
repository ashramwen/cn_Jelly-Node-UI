import * as d3 from 'd3';

import { D3HelperService } from '../d3-helper.service';

export class CanvasRule {

  private _ruleElement: d3.Selection<any, any, any, any>;
  private _ruleBackground: d3.Selection<any, any, any, any>;

  constructor(
    private canvas: D3HelperService
  ) {
    this.init();
  }  
  
  init() {
    this._ruleBackground = this.canvas.canvasWrapper
      .append('div')
      .attr('class', 'canvas-background')
      .style('position', 'absolute')
      .style('left', 0)
      .style('top', 0)
      .style('overflow', 'hidden');
    
    this._ruleElement = this._ruleBackground
      .append('div')
      .attr('class', 'canvas-rule')
      .style('width', '100%')
      .style('height', '100%');
  }

  update(width, height) {
    
    let ruleSize = Math.floor(this.canvas.NodeSettings.RULE_SIZE * this.canvas.currentScale);
    
     this._ruleBackground
      .style('width', `${width}px`)
      .style('height', `${height}px`)
      .style('background', `
        -webkit-linear-gradient(top, transparent ${ruleSize - 1}px, rgba(255,255,255,0.06) ${ruleSize}px),
        -webkit-linear-gradient(left, transparent ${ruleSize - 1}px, rgba(255,255,255,0.06) ${ruleSize}px), 
        -webkit-linear-gradient(top, #2f363b 0px, #2f363b ${ruleSize}px)`)
      .style('background-size', `${ruleSize}px ${ruleSize}px`);
    
      this._ruleElement.style('background', `
        -webkit-linear-gradient(top, transparent ${5 * ruleSize - 1}px, rgba(255,255,255,0.12) ${5 * ruleSize}px), 
        -webkit-linear-gradient(left, transparent ${5 * ruleSize - 1}px, rgba(255,255,255,0.12) ${5 * ruleSize}px)`)
      .style('background-size', `${5 * ruleSize}px ${5 * ruleSize}px`);
  }

}