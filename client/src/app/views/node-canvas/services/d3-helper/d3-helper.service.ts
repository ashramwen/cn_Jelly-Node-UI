import { JNFlow } from './../../../../core/models/jn-flow.type';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type';
import { Injectable, Sanitizer, SecurityContext, Injector } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import * as d3 from 'd3';
import { CanvasNode } from './canvas-node.type';
import { CanvasPoint } from './canvas-point.type';
import { CanvasLink } from './canvas-link.type';
import { CanvasObject } from './canvas-object.type';
import { JNUtils } from '../../../../share/util';
import { Events, NODE_EVENTS } from '../../../../share/services/event.service';
import { cn } from '../../../../../assets/i18n/cn';
import { JN_NODE_SETTING } from '../../../../share/providers/constants';
import { NodeSettings } from '../../../providers/constants';
import { INodeSettings } from '../../../interfaces/node-settings.interface';
import { SVGUtils } from './utils';
import { DragScrollService } from './drag-scroll.service';
import { JNKeyboardService } from '../keyboard.service';
import { CanvasSize } from './canvas-size.interface';
import { Observable, Subscriber } from 'rxjs';
import { JNClipboard } from './clipboard.service';

@Injectable()
export class D3HelperService {

  private vis: any;
  private parent: Element;
  private canvasWrapper: d3.Selection<any, any, any, any>;
  private canvasContainer: d3.Selection<any, any, any, any>;
  private canvas: any;
  private canvasBackground: d3.Selection<any, any, any, any>;
  private canvasRule: d3.Selection<any, any, any, any>;
  private brush: d3.Selection<any, any, any, any>;
  private tip: d3.Selection<any, any, any, any>;
  private dragWrapper: d3.Selection<any, any, any, any>;
  private navMap: d3.Selection<any, any, any, any>;

  private flow: JNFlow;  
  private nodes: CanvasNode[];
  private links: CanvasLink[];

  private selections: CanvasObject[];  
  private selectLink = null;
  private selectBrush = null;

  private sourceNode: CanvasNode = null;
  private targetNode: CanvasNode = null;
  private _dragOrigin: CanvasPoint;
  private _shift: CanvasPoint;
  private NodeSettings: INodeSettings;
  private _scale: number;
  private dragScrollService: DragScrollService;
  private clipboard: JNClipboard;
  private linkingNode: { from: 'input' | 'output'; node: CanvasNode };
  private navMapObservable: Observable<any>;
  private navMapSubscriber: Subscriber<any>;

  get currentScale() {
    return this._scale;
  }

  get canvasContainerSize(): CanvasSize{
    let ele = <HTMLDivElement> this.canvasContainer.node();
    return {
      width: ele.getBoundingClientRect().width,
      height: ele.getBoundingClientRect().height
    };
  }

  get viewPortSize(){
    let ele = <HTMLDivElement>this.canvasWrapper.node();
    return {
      width: ele.getBoundingClientRect().width,
      height: ele.getBoundingClientRect().height
    };
  }

  get viewPortPosition() {
    let ele = <HTMLDivElement>this.canvasWrapper.node();
    return {
      x: ele.scrollLeft,
      y: ele.scrollTop
    };
  }

  constructor(
    private events: Events,
    private translate: TranslateService,
    private _sanitizer: Sanitizer,
    private injector: Injector,
    private keybordService: JNKeyboardService
  ) {
    this.nodes = [];
    this.links = [];
    this.selections = [];
    let externalSettings = injector.get(JN_NODE_SETTING);
    this.NodeSettings = {};
    this._scale = 1;
    this.dragScrollService = DragScrollService.factory();

    Object.assign(this.NodeSettings, NodeSettings, externalSettings); 
  }

  init(parent: Element) {
    let self = this;
    this.parent = parent;

    this.canvasWrapper = d3.select(parent)
      .append('div')
      .attr('class', 'canvas-wrapper');
    
    this.canvasBackground = this.canvasWrapper
      .append('div')
      .attr('class', 'canvas-background')
      .style('position', 'absolute')
      .style('left', 0)
      .style('top', 0)
      .style('overflow', 'hidden');
    
    this.canvasRule = this.canvasBackground
      .append('div')
      .attr('class', 'canvas-rule')
      .style('width', '100%')
      .style('height', '100%');
    
    this.canvasContainer = this.canvasWrapper
      .append('svg')
      .attr('class', 'canvas-container')
      .attr('width', this.NodeSettings.CANVAS_WIDTH)
      .attr('height', this.NodeSettings.CANVAS_HEIGHT)
      .attr('pointer-events', 'all')
      .style('cursor', 'crosshair')
      .style('position', 'relative');
    
    this.canvas = this.canvasContainer
      .append('g')
      .attr('class', 'canvas');
    
    this.brush = this.canvas
      .append('g')
      .attr('class', 'brush')
      .attr('id', 'brush-wrapper');
    
    this.initBrush();
      
    this.vis = this.canvas
      .append('svg:g')
      .on('dblclick.zoom', null)
      .append('svg:g');

    this.dragWrapper = this.canvasWrapper
      .append('div')
      .attr('class', 'drag-wrapper');
    this.initDragWrapper();

    this.navMap = d3.select(this.parent)
      .append('div')
      .attr('class', 'nav-map');

    this.navMap
      .append('div')
      .attr('class', 'view-port')
      .append('div')
      .attr('class', 'inner');
    
    this.navMap
      .append('svg')
      .attr('class', 'canvas-map');
    
    this.initCanvasWrapper();
    
    this.updateCanvasContainer();
    this.initToolTip();
  }

  initBrush() {
    let self = this;

    this.brush.call(d3.brush()
      .on('start', () => {
        self.brush.raise();
      })
      .on('end', () => {
        // hide brush
        self.select([]);
        self.brush.lower();
        self.brush
          .selectAll('.selection,.handle')
          .style('display', 'none');
        
        // select nodes
        let selection = d3.event.selection;
        if (selection) {
          let maxX = Math.max(selection[0][0], selection[1][0]),
            maxY = Math.max(selection[0][1], selection[1][1]),
            minX = Math.min(selection[0][0], selection[1][0]),
            minY = Math.min(selection[0][1], selection[1][1]);
          
          let linksAndNodes: CanvasObject[] = (<Array<CanvasObject>>self.links).concat(self.nodes);
          let selectedObjects = linksAndNodes.filter(n =>
            n.x > minX
            && n.x + n.width < maxX
            && n.y > minY
            && n.y + n.height < maxY);
          
          self.select(selectedObjects);
        }
        
        self._updateNodes.bind(self)();
        self.updateLinks.bind(self)();
      }));
  }

  initToolTip() {
    this.tip = this.canvasWrapper
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');
    
    this.tip
      .append('span')
      .attr('class', 'fa fa-exclamation-circle');
    
    this.tip
      .append('span')
      .attr('class', 'tip-msg');
  }

  public updateNodes() {
    this._updateNodes();
  }

  private initDragWrapper() {
    this.dragWrapper
      .attr('fill', '#fff')
      .style('position', 'absolute')
      .style('left', '0px')
      .style('top', '0px')
      .style('opacity', '0')
      .call(d3.drag()
        .on('start', () => {
          let ele = this.canvasWrapper.node();
          this.dragScrollService.dragStart(ele);
        })
        .on('drag', () => {
          this.dragScrollService.dragMove();
        })
      )
      .style('display', 'none');
  }

  private initCanvasWrapper() {
    this.canvasWrapper.on('scroll', () => {
      this.updateMap();
      this.navMapSubscriber.next(false);
    });

    this.navMap
      .on('mouseenter', () => {
        this.navMapSubscriber.next(true);
      })
      .on('mouseleave', () => {
        this.navMapSubscriber.next(false);
      });
    
    this.navMapObservable = new Observable((subscriber) => {
      this.navMapSubscriber = subscriber;
    });
    this.navMapObservable
      .debounceTime(500)
      .subscribe((flag) => {
        this.navMap.style('display', flag ? 'block' : 'none');
      });
  }

  public enableDrapMove() {
    this.dragWrapper
      .style('display', 'block');
  }

  public disableDrapMove() {
    this.dragWrapper
      .style('display', 'none');
  }

  public scale(s) {
    if (s < this.NodeSettings.MIN_SCALE) {
      this._scale = this.NodeSettings.MIN_SCALE;
    } else if (s > this.NodeSettings.MAX_SCALE) {
      this._scale = this.NodeSettings.MAX_SCALE;
    } else {
      this._scale = s;
    }
    this.updateCanvas();
    this._updateNodes();
  }

  public loadFlow(flow: JNFlow) {
    this.flow = flow;
    this.clipboard = JNClipboard.factory(flow);
    this.nodes = [];
    this.links = [];
    this.selections = [];

    flow.nodes.forEach((n) => {
      this.addNode(n);
    });

    flow.nodes.forEach(t => {
      t.accepted.forEach(s => {
        let target = this.nodes
          .find(d => d.node === t);
        let source = this.nodes.find(d => d.node === s);
        this.addLink(source, target);
      });
    });
    this.select([]);
  }

  public addNode(node: JNBaseNode) {
    let canvasNode = new CanvasNode(node, this.canvas.node());
    this.nodes.push(canvasNode);
    this.drawNodes();
    // this.select(canvasNode);
  }

  public removeSelection() {
    this.selections.forEach((o) => {
      switch (o.constructor) {
        case CanvasNode:
          this.removeNode(<CanvasNode>o);
          break;
        case CanvasLink:
          this.removeLink(<CanvasLink>o);
          break;
        default:
          break;
      }
    });
    this.hideTip();
    this.selections = [];
  }

  public drawNodes() {
    let self = this;
    let mouseDownSubscriber: Subscriber<CanvasNode>;
    let dbClick = false;
    let mouseDownObservable = new Observable<CanvasNode>((s) => {
      mouseDownSubscriber = s;
    });
    mouseDownObservable
      .subscribe((d) => {
        if (dbClick) {
          self.events.emit('node_dblclick', d.node);
        } else {
          if (!self.selections || self.selections.indexOf(d) < 0) {
            self.select(d);
          }
          self.hideTip();
        }
        dbClick = false;  
      });
    
    let rects = this.vis
      .selectAll('g.node-group')
      .data(this.nodes);
    
    let shift = null;

    // node group
    let g = rects.enter()
      .append('svg:g')
      .classed('node-group', true)
      .on('dblclick', d => {
        dbClick = true;
        mouseDownSubscriber.next(d);
      })
      .on('mousemove', (d: CanvasNode) => {
        if (d.error) {
          self.showTip(d.error.message);
        }
      })
      .on('mouseleave', () => {
        self.hideTip();
      })
      .call(d3.drag()
        .on('start', function (d: CanvasNode) {
          mouseDownSubscriber.next(d);
          self.dragStart();
        })
        .on('drag', this.dragMove.bind(this))
        .on('end', this.dragEnd.bind(this))
      )
      .each((d: CanvasNode, i, eles) => {
        d.element = eles[i];
      });
    
    g.insert('svg:text')
      .classed('jn-icon', true);

    // node rect
    g.insert('svg:rect')
      .classed('node', true)
      .attr('height', this.NodeSettings.NODE_HEIGHT)
      .attr('rx', this.NodeSettings.NODE_RADIUS)
      .attr('ry', this.NodeSettings.NODE_RADIUS);

    // node text
    g.insert('svg:text')
      .classed('node-title', true)
      .style('font-size', this.NodeSettings.FONT_SIZE);

    // node input
    g.insert('svg:g')
      .classed('port input', true)
      .on('mouseenter', function (d: CanvasNode) {
        d3.select(this).classed('hover', true);
        if (!self.linkingNode) return;

        let connectable = self.linkingNode.from === 'output'
          && d.connectable(self.linkingNode.node);
        
        d3.select(this)
          .classed('error', !connectable)
          .classed('success', connectable);
        
        self.targetNode = d;
      })
      .on('mouseleave', function (d) {
        d3.select(this).classed('hover', false);
        d3.select(this).classed('error', false);
        d3.select(this).classed('success', false);
        self.targetNode = null;
      })
      .call(d3.drag()
        .on('start', (d: CanvasNode) => {
          this.linkingNode = {
            from: 'input',
            node: d
          };
        })
        .on('drag', function(d: CanvasNode) {
          let position = d3.mouse(self.canvas.node());
          let linkData = {
            source: { x: position[0], y: position[1] },
            target: { x: d.x, y: d.y + self.NodeSettings.NODE_HEIGHT / 2 }
          };
          self.moveMouseLink(linkData);
        })
        .on('end', (d: CanvasNode) => {
          self.vis.selectAll('g.new_link').remove();
          if (self.sourceNode) {
            self.createNodeLink(self.sourceNode, d);
          }
          self.linkingNode = null;
          self.sourceNode = null;
          self.targetNode = null;
        })
      )
      .insert('svg:rect');

    // node output
    g.insert('svg:g')
      .classed('port output', true)
      .on('mouseenter', function (d: CanvasNode) {
        d3.select(this).classed('hover', true);
        if (!self.linkingNode) return;

        let connectable = self.linkingNode.from === 'input'
          && d.connectable(self.linkingNode.node);
        
        d3.select(this)
          .classed('error', !connectable)
          .classed('success', connectable);

        self.sourceNode = d;
      })
      .on('mouseleave', function (d) {
        d3.select(this).classed('hover', false);
        d3.select(this).classed('error', false);
        d3.select(this).classed('success', false);
        self.sourceNode = null;
      })
      .call(d3.drag()
        .on('start', (n: CanvasNode) => {
          this.linkingNode = {
            from: 'output',
            node: n
          };
        })
        .on('drag', function(d: CanvasNode) {
          let position = d3.mouse(self.canvas.node());
          let linkData = {
            source: { x: d.x + d.width, y: d.y + self.NodeSettings.NODE_HEIGHT / 2 },
            target: { x: position[0], y: position[1] }
          };
          self.moveMouseLink(linkData);
        })
        .on('end', (d: CanvasNode) => {
          self.vis.selectAll('g.new_link').remove();
          if (self.targetNode) {
            self.createNodeLink(d, self.targetNode);
          }
          self.linkingNode = null;
          self.sourceNode = null;
          self.targetNode = null;
        })
      )
      .insert('svg:rect');
    
    rects.exit().remove();
    this._updateNodes();
  }

  private updateCanvasContainer() {
    let maxWidth = this.NodeSettings.CANVAS_WIDTH,
      maxHeight = this.NodeSettings.CANVAS_HEIGHT;

    this.nodes.forEach((n) => {
      // node right + margin right
      let x = n.position.x + n.width + 200,
        y = n.position.y + n.height + 200;
      
      maxWidth = maxWidth < x ? x : maxWidth;
      maxHeight = maxHeight < y ? y : maxHeight;
    });

    maxWidth = maxWidth * this._scale;
    maxHeight = maxHeight * this._scale;


    let parentWidth = this.canvasWrapper.node().getBoundingClientRect().width,
      parentHeight = this.canvasWrapper.node().getBoundingClientRect().height;
    
    maxWidth = maxWidth < parentWidth ? parentWidth : maxWidth;
    maxHeight = maxHeight < parentHeight ? parentHeight : maxHeight;

    this.canvasContainer
      .attr('width', maxWidth)
      .attr('height', maxHeight)
      .classed('selected', d => !!this.selections.length);
    
    this.updateCanvasBackGround(maxWidth, maxHeight);
    this.updateDragWrapper(maxWidth, maxHeight);
  }

  private updateCanvas() {
    this.canvas
      .attr('transform', `scale(${this._scale})`);
  }

  private updateMap() {

    let scale = 1;
    let scaleX = this.NodeSettings.MAP_WIDTH / this.canvasContainerSize.width;
    let scaleY = this.NodeSettings.MAP_HEIGHT / this.canvasContainerSize.height;
    scale = scaleX < scaleY ? scaleX : scaleY;
    // scale *= this._scale;

    this.navMap
      .style('display', 'block');
    
    let svg = this.navMap
      .select('svg')
      .html(this.canvasContainer.html());
    
    svg
      .attr('width', this.canvasContainerSize.width * scale)
      .attr('height', this.canvasContainerSize.height * scale)
      .select('g')
      .attr('transform', `scale(${scale * this._scale})`)
      .selectAll('text')
      .remove();
    
    let viewPort = this.navMap.select('.view-port');
    let _vw = this.viewPortSize.width * scale + 'px',
      _vh = this.viewPortSize.height * scale + 'px',
      _vy = this.viewPortPosition.y * scale + 'px',
      _vx = this.viewPortPosition.x * scale + 'px';
    
    viewPort
      .style('width', _vw)
      .style('height', _vh)
      .style('top', _vy)
      .style('left', _vx);
  }

  public cut() {
    this.copy();
    this.removeSelection();
  }

  public copy() {
    this.clipboard.copy(this.selections);
  }

  public paste() {
    this.clipboard.paste();
  }

  private updateCanvasBackGround(width: number, height: number) {
    let ruleSize = Math.floor(this.NodeSettings.RULE_SIZE * this._scale);
    
     this.canvasBackground
      .style('width', `${width}px`)
      .style('height', `${height}px`)
      .style('background', `
        -webkit-linear-gradient(top, transparent ${ruleSize - 1}px, rgba(255,255,255,0.06) ${ruleSize}px),
        -webkit-linear-gradient(left, transparent ${ruleSize - 1}px, rgba(255,255,255,0.06) ${ruleSize}px), 
        -webkit-linear-gradient(top, #2f363b 0px, #2f363b ${ruleSize}px)`)
      .style('background-size', `${ruleSize}px ${ruleSize}px`);
    
    this.canvasRule
      .style('background', `
        -webkit-linear-gradient(top, transparent ${5 * ruleSize - 1}px, rgba(255,255,255,0.12) ${5 * ruleSize}px), 
        -webkit-linear-gradient(left, transparent ${5 * ruleSize - 1}px, rgba(255,255,255,0.12) ${5 * ruleSize}px)`)
      .style('background-size', `${5 * ruleSize}px ${5 * ruleSize}px`);
  }

  private updateDragWrapper(width: number, height: number) {
    this.dragWrapper
      .style('width', `${width}px`)
      .style('height', `${height}px`);
  }

  private _updateNodes() {
    let self = this;

    // adjust node width and text position
    let nodes = this.vis.selectAll('g.node-group')
      .data(this.nodes)
      .each((n: CanvasNode, i, eles: Element) => {
        n.element = eles[i];
        d3.select(eles[i]).selectAll('text').datum(n);
        d3.select(eles[i]).select('rect.node').datum(n);
        d3.select(eles[i]).select('path').datum(n);
        d3.select(eles[i]).select('.port.input').datum(n);
        d3.select(eles[i]).select('.port.output').datum(n);
      });
    
    let nodeText = nodes.select('text.node-title'),
      nodeIcon = nodes.select('text.jn-icon'),
      nodeRect = nodes.select('rect'),
      nodeInput = nodes.select('.port.input'),
      nodeOutput = nodes.select('.port.output');

    nodes
      .attr('transform', (d: CanvasNode) => {
        return `translate(${d.position.x}, ${d.position.y})`;
      })
      .classed('connected', (d: CanvasNode) => {
        return d.connected;
      })
      .classed('selected', (d: CanvasNode) => {
        return self.selections.indexOf(d) > -1;
      })
      .classed('error', (d: CanvasNode) => {
        return !!d.error;
      });
    
    nodeIcon
      .attr('x', (n: CanvasNode) => {
        if (!n.hasInput) return self.NodeSettings.NODE_PADDING;
        return self.NodeSettings.NODE_PADDING + Math.floor(this.NodeSettings.HANDLER_WIDTH / 2);
      })
      .attr('y', () => {
        return Math.floor(self.NodeSettings.NODE_HEIGHT / 2 + self.NodeSettings.NODE_ICON_HOLDER_WIDTH / 2);
      })
      .attr('font-family', 'icomoon')
      .style('font-size', `${self.NodeSettings.NODE_ICON_HOLDER_WIDTH}px`)
      .text((d: CanvasNode) => {
        return d.icon;
      });

    nodeText
      .text((d: CanvasNode) => {
        let name = d.node.name;
        this.translate.get(name).subscribe((nameTranslated) => {
          name = nameTranslated || name;
        });
        return name;
      })
      .each((d, j, eles: SVGTextElement[]) => {
        let textEle = eles[j];
        let maxTextLength = this.NodeSettings.NODE_MAX_WIDTH - 3 * this.NodeSettings.NODE_PADDING - this.NodeSettings.NODE_ICON_HOLDER_WIDTH;
        let textLength = textEle.getComputedTextLength(),
          text = textEle.textContent;
        while (textLength > maxTextLength && text.length > 0) {
          text = text.slice(0, -1);
          textEle.textContent = text;
          textLength = textEle.getComputedTextLength();
        }
      })
      .attr('y', (d, j, eles: SVGTextElement[]) => {
        return Math.floor(this.NodeSettings.NODE_HEIGHT / 2 + this.NodeSettings.FONT_SIZE / 2);
      });
    
    nodeRect
      .attr('x', (n: CanvasNode) => {
        if (!n.hasInput) return 0;
        return Math.floor(this.NodeSettings.HANDLER_WIDTH / 2);
      })
      .attr('width', (n: CanvasNode) => {
        let textEle: SVGTextElement = <SVGTextElement>d3.select(n.element).select('text.node-title').node();
        let textWidth = textEle.getComputedTextLength();
        let nodeWidth = this.NodeSettings.NODE_PADDING * 3 + this.NodeSettings.NODE_ICON_HOLDER_WIDTH + textWidth;
        nodeWidth = nodeWidth > this.NodeSettings.NODE_MIN_WIDTH ? nodeWidth : this.NodeSettings.NODE_MIN_WIDTH;

        d3.select(textEle)
          .attr('x', (d: CanvasNode, i, eles) => {
            if (!d.hasInput) return nodeWidth - textWidth - this.NodeSettings.NODE_PADDING;
            return nodeWidth - textWidth - this.NodeSettings.NODE_PADDING
              + Math.floor(this.NodeSettings.HANDLER_WIDTH / 2);
          });
        return nodeWidth;
      });

    nodeInput
      .style('display', (n: CanvasNode) => {
        return n.hasInput ? 'block' : 'none';
      })
      .attr('transform', () => {
        let x = 0,
          y = Math.floor(this.NodeSettings.NODE_HEIGHT - this.NodeSettings.HANDLER_HEIGHT) / 2;
        return `translate(${x}, ${y})`;
      })
      .select('rect')
      .attr('width', this.NodeSettings.HANDLER_WIDTH)
      .attr('height', this.NodeSettings.HANDLER_HEIGHT)
      .attr('rx', this.NodeSettings.HANDLER_RADIUS)
      .attr('ry', this.NodeSettings.HANDLER_RADIUS)
      .classed('connected', (n: CanvasNode) => {
        return n.inputConnected;
      });

    nodeOutput
      .style('display', (n: CanvasNode) => {
        return n.hasOutput ? 'block' : 'none';
      })
      .attr('transform', (d: CanvasNode) => {
        let rectEle: SVGSVGElement = <SVGSVGElement>d3.select(d.element).select('rect').node();
        let nodeWidth = SVGUtils.getWith(rectEle);
        let x = d.hasInput ? nodeWidth : nodeWidth - Math.floor(this.NodeSettings.HANDLER_WIDTH / 2),
          y = Math.floor(this.NodeSettings.NODE_HEIGHT - this.NodeSettings.HANDLER_HEIGHT) / 2;
        return `translate(${x}, ${y})`;
      })
      .select('rect')
      .attr('width', this.NodeSettings.HANDLER_WIDTH)
      .attr('height', this.NodeSettings.HANDLER_HEIGHT)
      .attr('rx', this.NodeSettings.HANDLER_RADIUS)
      .attr('ry', this.NodeSettings.HANDLER_RADIUS)
      .classed('connected', (n: CanvasNode) => {
        return n.outputConnected;
      });

    nodes.exit().remove();
    self.updateLinks();
    self.updateCanvasContainer();
  }

  private removeNode(node: CanvasNode) {
    this.events.emit(NODE_EVENTS.SELECTION_BEFORE_REMOVED, node.node);
    this.links
      .filter(link => link.source === node || link.target === node)
      .forEach(l => this.removeLink(l, true));
    
    this.flow.removeNode(node.node);
    JNUtils.removeItem(this.nodes, node);
    setTimeout(() => {
      this.drawNodes();
    });
    this.events.emit(NODE_EVENTS.SELECTION_CHANGED, []);
  }

  private removeLink(link: CanvasLink, preventEvent?: boolean) {
    if (this.links.indexOf(link) === -1) return; 
    if (!preventEvent) {
      this.events.emit(NODE_EVENTS.LINK_BEFORE_REMOVED,
        { source: link.source.node, target: link.target.node });
    }
    JNUtils.removeItem(this.links, link);
    this.flow.removeLink({source: link.source.node, target: link.target.node});
    this.drawLinks();
    setTimeout(() => {
      this._updateNodes();
    });
  }

  private select(o: CanvasObject[] | CanvasObject) {
    if (o instanceof Array) {
      this.selections = o;
    } else {
      this.selections = [o];
    }
    let nodes = this.selections
      .filter(n => n instanceof CanvasNode)
      .map((n: CanvasNode) => n.node);
    this.events.emit(NODE_EVENTS.SELECTION_CHANGED, nodes);
    this._updateNodes();
  }

  private dragStart() {
    let position = d3.mouse(this.canvas.node());
    this._dragOrigin = {
      x: position[0],
      y: position[1]
    };
  }

  private dragMove() {
    let position = d3.mouse(this.canvas.node());
    this._shift = {
      x: position[0] - this._dragOrigin.x,
      y: position[1] - this._dragOrigin.y
    };
    this.selections
      .filter((o) => {
        return o instanceof CanvasNode;
      })
      .forEach((n: CanvasNode, i) => {
        n.offset = {
          x: this._shift.x,
          y: this._shift.y
        };
      });
    this._updateNodes();
  }

  private dragEnd() {
    if (!this.selections.length) return;

    // check changes
    // return if no node moved
    let changed = this.selections
      .filter((o) => {
        return o instanceof CanvasNode;
      })
      .find((n: CanvasNode) => {
        return !!n.offset.x || !!n.offset.y;
      });
    if (!changed) return;

    this.events.emit(NODE_EVENTS.SELECTION_BEFORE_MOVED, this.selections);
    
    this.selections
      .filter((o) => {
        return o instanceof CanvasNode;
      })
      .forEach((n: CanvasNode, i) => {
        n.updatePosition();
      });
  }

  private moveMouseLink = (linkData) => {
    let link = this.vis.selectAll('g.new_link').data([linkData]);
    link.exit().remove();
    link.enter().insert('svg:g', ':first-child')
      .classed('new_link', true)
      .insert('svg:path')
      .attr('d', (_d) => {
        return this.genLinkPathValueWithPoints(_d.source, _d.target);
      });

    link.select('path')
      .attr('d', (_d) => {
        return this.genLinkPathValueWithPoints(_d.source, _d.target);
      });
  }

  private createNodeLink = (s: CanvasNode, t: CanvasNode) => {
    if (this.links.find(l => l.source === s && l.target === t)) return;
    if (!t.node.connectable(s.node)) return;
    this.events.emit(NODE_EVENTS.NODE_BEFORE_LINKED, t.node);
    t.node.accept(s.node);
    this.addLink(s, t);
    this._updateNodes();
  }

  private addLink(s: CanvasNode, t: CanvasNode) {
    let newLink: CanvasLink = new CanvasLink(s, t, this.canvas.node());
    this.links.push(newLink);
    this.drawLinks();
  }

  private drawLinks = () => {
    let self = this;

    this.vis.selectAll('g.link')
      .data(this.links)
      .exit()
      .remove();
    
    let links = this.vis.selectAll('g.link')
      .data(this.links)
      .enter()
      .insert('svg:g', ':first-child')
      .classed('link', true)
      .on('click', function (d) {
        self.select(d);
      })
      .on('mousemove', (d: CanvasLink) => {
        if (d.error) {
          self.showTip(d.error.message);
        }
      })
      .on('mouseleave', () => {
        self.hideTip();
      })
      .call(d3.drag()
        .on('start', this.dragStart.bind(this))
        .on('drag', this.dragMove.bind(this))
        .on('end', this.dragEnd.bind(this))
      );
    
    let path = links
      .insert('svg:path')
      .classed('link', true);
    
    let pathWrapper = links
      .insert('svg:path')
      .classed('link-wrapper', true);
    
    this.updateLinks();
  }

  private updateLinks() {
    let self = this;

    let links = this.vis.selectAll('g.link')
      .data(this.links);
    
    links.exit().remove();
    
    links.classed('selected', (d) => {
        return self.selections.indexOf(d) > -1;
      })
      .classed('error', (d: CanvasLink) => {
        return !!d.error;
      })
      .each((d: CanvasLink, i, eles) => {
        d.element = eles[i];
        d3.select(eles[i]).selectAll('path').datum(d);
      });

    links.selectAll('path')
      .attr('d', this.genLinkPathValueWithLink.bind(this));
  }

  private genLinkPathValueWithLink (d: CanvasLink) {
    let {source, target} = getLinkPath.bind(this)(d.source, d.target);

    return this.genLinkPathValueWithPoints(source, target);

    function getLinkPath(s: CanvasNode, t: CanvasNode) {
      let self: D3HelperService = this;

      let targetNode = t.element;
      let sourceNode = s.element;

      let x1 = s.x + s.width;
      let y1 = s.y + Math.floor(s.height / 2);

      let x2 = t.x;
      let y2 = t.y + Math.floor(t.height / 2);

      return {
        source: { x: x1, y: y1 },
        target: { x: x2, y: y2 }
      };
    }
  }

  private showTip(message: string) {
    let position = d3.mouse(this.canvas.node());

    this.tip
      .style('opacity', .9);
    
    this.tip
      .select('.tip-msg')
      .text(() => {
        return `${message}`;
      });
    
    this.tip
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

  private hideTip() {
    this.tip
      .style('display', 'none')
      .style('opacity', 0);
  }

  /**
   * @summary modified by george on 2016/11/21, smooth links. 
   */
  private genLinkPathValueWithPoints(source: CanvasPoint, target: CanvasPoint) {
    let self = this;
    let lineCurveScale = 0.75,
      deltaX = Math.abs(target.x - source.x),
      deltaY = Math.abs(target.y - source.y),
      dy = target.y - (source.y + 1),
      dx = (target.x - deltaX / 2) - (source.x + deltaX / 2),
      delta = Math.sqrt(dy * dy + dx * dx),
      scale = lineCurveScale,
      scaleY = 0;

     deltaX = deltaX > 20 ? deltaX : 20;

    if (delta < deltaX) {
      scale = 0.75 - 0.75 * ((deltaX - delta) / deltaX);
    }

    if (dx < 0) {
      scale += 2 * (Math.min(5 * deltaX, Math.abs(dx)) / (5 * deltaX));
      if (Math.abs(dy) < 3 * deltaY) {
        scaleY = ((dy > 0) ? 0.5 : -0.5) * ((3 * deltaY - Math.abs(dy)) / (3 * deltaY)) * (Math.min(deltaX, Math.abs(dx)) / deltaX);
      }
    }

    let v = `M${source.x} ${source.y} C ${source.x + scale * deltaX / 2} ${source.y + scaleY * deltaY} ${target.x - scale * deltaX / 2} ${target.y - scaleY * deltaY} ${target.x} ${target.y}`;
    return v;
  }
}
