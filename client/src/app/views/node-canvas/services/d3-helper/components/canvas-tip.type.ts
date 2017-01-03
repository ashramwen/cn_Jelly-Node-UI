import * as d3 from 'd3';
import { D3HelperService } from '../d3-helper.service';

export class CanvasTip {
  private _tip: d3.Selection<any, any, any, any>;

  constructor(
    private canvas: D3HelperService
  ) {
    this.init();
  }

  init() {
    this._tip = this.canvas.canvasWrapper
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');
    
    this._tip
      .append('span')
      .attr('class', 'fa fa-exclamation-circle');
    
    this._tip
      .append('span')
      .attr('class', 'tip-msg');
  }

  public show(message: string) {
    let position = d3.mouse(this.canvas.canvas.node());

    this._tip
      .style('opacity', .9);
    
    this._tip
      .select('.tip-msg')
      .text(() => {
        return `${message}`;
      });
    
    this._tip
      .style('display', 'block')
      .style('left', (d, i, eles: Element[]) => {
        let ele = eles[i];
        return position[0] - 8 + 'px';
      })
      .style('top', (d, i, eles) => {
        let ele = eles[i];
        return position[1] - ele.getBoundingClientRect().height - 12 + 'px';
      });
  }

  public hide() {
    this._tip
      .style('display', 'none')
      .style('opacity', 0);
  }
  
}