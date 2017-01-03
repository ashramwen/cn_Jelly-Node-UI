import * as d3 from 'd3';
import { EventObject } from '../../../../../share/models/event-object.type';
import { D3HelperService } from '../d3-helper.service';
import { Observable, Subscriber } from 'rxjs';
import { CanvasSize } from '../models/canvas-size.interface';

export class CanvasMap extends EventObject {

  private _navMap: d3.Selection<any, any, any, any>;
  private navMapObservable: Observable<boolean>;
  private navMapSubscriber: Subscriber<boolean>;

  constructor(
    private canvas: D3HelperService
  ) {
    super();
    this.init();
  }

  init() {
    this.navMapObservable = new Observable<boolean>((subscriber) => {
      this.navMapSubscriber = subscriber;
    });

    this.navMapObservable
      .debounceTime(500)
      .subscribe((flag) => {
        this._navMap.style('display', flag ? 'block' : 'none');
      });

    this._navMap = d3.select(this.canvas.parent)
      .append('div')
      .attr('class', 'nav-map')
      .on('mouseenter', () => {
        this.navMapSubscriber.next(true);
      })
      .on('mouseleave', () => {
        this.navMapSubscriber.next(false);
      });

    this._navMap
      .append('div')
      .attr('class', 'view-port')
      .append('div')
      .attr('class', 'inner');
    
    this._navMap
      .append('svg')
      .attr('class', 'canvas-map');
  }

  update() {

    let scale = 1;
    let scaleX = this.canvas.NodeSettings.MAP_WIDTH / this.canvasContainerSize.width;
    let scaleY = this.canvas.NodeSettings.MAP_HEIGHT / this.canvasContainerSize.height;
    scale = scaleX < scaleY ? scaleX : scaleY;
    // scale *= this._scale;

    this._navMap
      .style('display', 'block');
    
    let svg = this._navMap
      .select('svg')
      .html(this.canvas.canvasContainer.html());
    
    svg
      .attr('width', this.canvasContainerSize.width * scale)
      .attr('height', this.canvasContainerSize.height * scale)
      .select('g')
      .attr('transform', `scale(${scale * this.canvas.currentScale})`)
      .selectAll('text')
      .remove();
    
    let viewPort = this._navMap.select('.view-port');
    let _vw = this.viewPortSize.width * scale + 'px',
      _vh = this.viewPortSize.height * scale + 'px',
      _vy = this.viewPortPosition.y * scale + 'px',
      _vx = this.viewPortPosition.x * scale + 'px';
    
    viewPort
      .style('width', _vw)
      .style('height', _vh)
      .style('top', _vy)
      .style('left', _vx);
    
    this.navMapSubscriber.next(false);
  }

  private get canvasContainerSize(): CanvasSize{
    let ele = <HTMLDivElement> this.canvas.canvasContainer.node();
    return {
      width: ele.getBoundingClientRect().width,
      height: ele.getBoundingClientRect().height
    };
  }

  private get viewPortSize(){
    let ele = <HTMLDivElement>this.canvas.canvasWrapper.node();
    return {
      width: ele.getBoundingClientRect().width,
      height: ele.getBoundingClientRect().height
    };
  }

  private get viewPortPosition() {
    let ele = <HTMLDivElement>this.canvas.canvasWrapper.node();
    return {
      x: ele.scrollLeft,
      y: ele.scrollTop
    };
  }
}