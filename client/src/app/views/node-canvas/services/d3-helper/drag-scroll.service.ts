import { Injectable } from '@angular/core';
import * as d3 from 'd3';

interface IPosition{
  x: number;
  y: number;
}

export class DragScrollService{

  private _startScroll: IPosition;
  private _startPoint: IPosition;
  private _ele: Element;

  static factory(){
    return new DragScrollService();
  }

  dragStart(ele: Element) {
    let e: d3.D3DragEvent<HTMLDivElement, any, any> = d3.event;
    this._ele = ele;
    let position = {
      x: ele.scrollLeft,
      y: ele.scrollTop
    };
    this._startScroll = position;
    this._startPoint = {
      x: e.x,
      y: e.y
    };
  }

  dragMove() {
    let e: d3.D3DragEvent<HTMLDivElement, any, any> = d3.event;
    let dx = e.x - this._startPoint.x,
      dy = e.y - this._startPoint.y;
    
    this._ele.scrollLeft = this._startScroll.x - dx;
    this._ele.scrollTop = this._startScroll.y - dy;
  }
}