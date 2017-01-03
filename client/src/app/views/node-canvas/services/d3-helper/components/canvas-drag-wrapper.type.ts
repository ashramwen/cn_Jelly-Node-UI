import * as d3 from 'd3';
import { SyncEvent } from 'ts-events';

import { D3HelperService } from '../d3-helper.service';
import { EventObject } from '../../../../../share/models/event-object.type';

export enum DRAG_WRAPPER_EVENTS{
  DRAG_START, DRAG, DRAG_END
}

export class CanvasDragWrapper extends EventObject{

  private _dragWrapper: d3.Selection<any, any, any, any>;

  constructor(
    private canvas: D3HelperService
  ) { 
    super();
    this.init();
  }

  init() {
    this._dragWrapper = this.canvas.canvasWrapper
      .append('div')
      .attr('class', 'drag-wrapper');
    
    this._dragWrapper
      .attr('fill', '#fff')
      .style('position', 'absolute')
      .style('left', '0px')
      .style('top', '0px')
      .style('opacity', '0')
      .call(d3.drag()
        .on('start', () => {
          this.emit(DRAG_WRAPPER_EVENTS.DRAG_START, d3.event);
        })
        .on('drag', () => {
          this.emit(DRAG_WRAPPER_EVENTS.DRAG, d3.event);
        })
      )
      .style('display', 'none');
  }

  update(width: number, height: number) {
    this._dragWrapper
      .style('width', `${width}px`)
      .style('height', `${height}px`);
  }

  enable(){
    this._dragWrapper
      .style('display', 'block');
  }

  disable(){
    this._dragWrapper
      .style('display', 'none');

  }
}