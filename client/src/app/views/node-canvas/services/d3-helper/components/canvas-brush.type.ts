import * as d3 from 'd3';
import { SyncEvent } from 'ts-events';

import { D3HelperService } from '../d3-helper.service';
import { EventObject } from '../../../../../share/models/event-object.type';

interface CanvasBrushEndEvent {
  left: number;
  top: number;
  width: number;
  height: number;
}

export enum BRUSH_EVENTS {
  START, BRUSH, END
}

export class CanvasBrush extends EventObject{

  private _brushElement: d3.Selection<any, any, any, any>;  
  private BrushEndEvent: SyncEvent<CanvasBrushEndEvent>;

  constructor(
    private canvas: D3HelperService
  ) {
    super();
    this.init();
  }

  init() {
    let self = this;

    if (this._brushElement) {
      this._brushElement.remove();
    }

    this._brushElement = this.canvas.canvas
      .append('g')
      .attr('class', 'brush')
      .attr('id', 'brush-wrapper');
    
    this._brushElement.lower();

    // brush unbind event

    let brush = d3.brush()
      .on('start', () => {
        this._brushElement.raise();
        this.emit(BRUSH_EVENTS.START, d3.event);
      })
      .on('end', () => {
        this.emit(BRUSH_EVENTS.END, d3.event.selection);
        this._brushElement.lower();
        // hide brush
        this._brushElement
          .selectAll('.selection,.handle')
          .style('display', 'none');
      });

    this._brushElement.call(brush);
  }

  public update() {
    this.init();
  }
}