import { JNFlow } from './../../../../core/models/jn-flow.type';
import { Events } from './../../../../core/services/event.service';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type'
import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import * as d3 from 'd3';
import { CanvasNode } from './canvas-node.type';
import { CanvasPoint } from './canvas-point.type';
import { NODE_EVENTS } from '../../../../core/services/event.service';

interface CanvasLink {
  source: CanvasNode;
  target: CanvasNode;
}

@Injectable()
export class D3HelperService {

  private spaceWidth = 1464;
  private spaceHeight = 944;

  private readonly NODE_MAX_WIDTH = 180;
  private readonly NODE_MIN_WIDTH = 100;
  private readonly NODE_RADIUS = 5;
  private readonly NODE_HEIGHT = 34;
  private readonly NODE_PADDING = 10;
  private readonly NODE_ICON_HOLDER_WIDTH = 30;

  private readonly HANDLER_WIDTH = 10;
  private readonly HANDLER_HEIGHT = 10;
  private readonly HANDLER_RADIUS = 3;

  private readonly FONT_SIZE = 13;
  private readonly PATH_STROKE_WIDTH = 2;

  private vis: any;
  private canvas: any;

  private data: CanvasNode[];
  private links: any[];

  private selectNode: CanvasNode = null;

  private selectLink = null;
  private selectBrush = null;

  private inputDragging = false;
  private outputDragging = false;

  constructor(private events: Events, private translate: TranslateService) {
    this.data = [];
    this.links = [];
  }

  init(svg: Element) {
    let self = this;
    // var margin = { top: 20, right: 120, bottom: 20, left: 120 },
    //   spaceWidth = 960 - margin.right - margin.left,
    //   spaceHeight = 500 - margin.top - margin.bottom;

    this.canvas = d3.select(svg)
      .attr('width', this.spaceWidth)
      .attr('height', this.spaceHeight)
      .attr('pointer-events', 'all')
      .style('cursor', 'crosshair')
      .on('mousedown', mousedown)
      .on('mouseup', mouseup)
      .on('mousemove', moving);

    this.vis = this.canvas
      .append('svg:g')
      .on('dblclick.zoom', null)
      .append('svg:g');

    let shift = null;

    function mousedown() {
      d3.event.preventDefault();
      if (d3.event.button !== 0) return;
      if (self.selectNode) {
        let mousePosition = d3.mouse(this);
        console.log(self.selectNode);
        shift = {
          x: mousePosition[0] - self.selectNode.x,
          y: mousePosition[1] - self.selectNode.y,
        };
      }
    }

    function mouseup() {
      self.vis.selectAll('g.new_link').remove();
      self.selectNode = null;
      self.inputDragging = false;
      self.outputDragging = false;
    }

    function moving() {
      d3.event.preventDefault();
      let d = self.selectNode;
      let position = d3.mouse(this);

      // create&move mouse-link from input
      if (self.inputDragging && d) {
        let linkData = {
          source: { x: position[0], y: position[1] },
          target: { x: d.x - self.HANDLER_WIDTH / 2, y: d.y + self.NODE_HEIGHT / 2 }
        };
        self.moveMouseLink(linkData);
        return;
      }

      // create&move mouse-link from output
      if (self.outputDragging && d) {
        let linkData = {
          source: { x: d.x + d.width + self.HANDLER_WIDTH / 2, y: d.y + self.NODE_HEIGHT / 2 },
          target: { x: position[0], y: position[1] }
        };
        self.moveMouseLink(linkData);
        return;
      }

      // move node
      if (d) {
        position[0] -= shift.x;
        position[1] -= shift.y;
        d.x = Math.max(0, Math.min(self.spaceWidth - d.width, position[0]));
        d.y = Math.max(0, Math.min(self.spaceHeight - self.NODE_HEIGHT, position[1]));
        self.updateNode(d);
        /*
        self.vis.selectAll('g.node_group')
          .filter((dt: CanvasNode) => {
            return dt.node.body.nodeID === d.node.body.nodeID;
          })
          .attr('transform', (_d: CanvasNode, i, ele) => {
            return `translate(${_d.x}, ${_d.y})`;
          });
        */
        // self.moveNodeLink();
      }
    }
  }

  addNode(node: JNBaseNode) {
    let canvasNode = new CanvasNode(node);
    this.data.push(canvasNode);
    this.drawNode();
  }

  drawNode() {
    let self = this;
    let rects = this.vis.selectAll('g.node_group').data(this.data);
    rects.exit().remove();

    // node group
    let g = rects.enter()
      .append('svg:g')
      .classed('node_group', true)
      .on('click', d => {
        this.events.emit('node_click', d.node);
      })
      .on('dblclick', d => {
        this.events.emit('node_dblclick', d.node);
      })
      .on('mousedown', d => {
        console.log('node down');
        if (d3.event.button !== 0) return;
        this.selectNode = d;
      })
      .on('mouseup', d => {
        console.log('node up');
        this.selectNode = null;
      })
      .each((d: CanvasNode, i, eles) => {
        d.element = eles[i];
      });

    // node rect
    g.insert('svg:rect')
      .classed('node', true)
      .attr('height', this.NODE_HEIGHT)
      .attr('rx', this.NODE_RADIUS)
      .attr('ry', this.NODE_RADIUS);

    // node text
    g.insert('svg:text')
      .attr('x', this.NODE_ICON_HOLDER_WIDTH + this.NODE_PADDING)
      .style('font-size', this.FONT_SIZE);

    // node icon right path
    g.insert('svg:path')
      .attr('d', `M ${this.NODE_HEIGHT} 1 l 0 ${this.NODE_HEIGHT}`);

    // node input
    g.insert('svg:g')
      .classed('port input', true)
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
      })
      .on('mouseleave', function (d) {
        d3.select(this).classed('hover', false);
      })
      .on('mousedown', function (d) {
        console.log('input down');
        if (d3.event.button !== 0) return;
        self.selectNode = d;
        self.inputDragging = true;
      })
      .on('mouseup', function (d) {
        console.log('input up');
        if (self.selectNode) {
          self.createNodeLink(self.selectNode, d);
        }
        self.selectNode = null;
        self.inputDragging = false;
      })
      .insert('svg:rect');

    // node output
    g.insert('svg:g')
      .classed('port output', true)
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
      })
      .on('mouseleave', function (d) {
        d3.select(this).classed('hover', false);
      })
      .on('mousedown', function (d) {
        console.log('output down');
        if (d3.event.button !== 0) return;
        self.selectNode = d;
        self.outputDragging = true;
      })
      .on('mouseup', function (d) {
        console.log('output up');
        if (self.selectNode) {
          self.createNodeLink(d, self.selectNode);
        }
        self.selectNode = null;
        self.outputDragging = false;
      })
      .insert('svg:rect');

    this.data.forEach(n => this.updateNode(n));
  }

  public updateNode(canvasNode: CanvasNode) {
    let self = this;

    // adjust node width and text position
    let _node = d3.select(canvasNode.element);
    let nodeText = _node.select('text'),
      nodeRect = _node.select('rect'),
      nodeInput = _node.select('.port.input'),
      nodeOutput = _node.select('.port.output');

    _node
      .attr('transform', (d: any) => {
        return `translate(${d.x}, ${d.y})`;
      });

    nodeText
      .text((d: CanvasNode) => {
        let name = d.node.name;
        this.translate.get(name).subscribe((nameTranslated) => {
          name = nameTranslated || name;
        });
        return name;
      })
      .each((d, j, e) => {
        let textEle = <any>nodeText.node();
        let maxTextLength = self.NODE_MAX_WIDTH - 2 * self.NODE_PADDING - this.NODE_ICON_HOLDER_WIDTH;
        let textLength = textEle.getComputedTextLength(),
          text = textEle.textContent;
        while (textLength > maxTextLength && text.length > 0) {
          text = text.slice(0, -1);
          textEle.textContent = text;
          textLength = textEle.getComputedTextLength();
        }
      })
      .attr('y', (d, j, e) => {
        let textEle = <any>e[j];
        let textHeight = textEle.getBoundingClientRect().height;
        return Math.floor(this.NODE_HEIGHT - textHeight);
      });

    nodeRect
      .attr('width', () => {
        let textEle = <any>nodeText.node();
        let textWidth = textEle.getComputedTextLength();
        let nodeWidth = this.NODE_PADDING * 2 + this.NODE_ICON_HOLDER_WIDTH + textWidth;
        nodeWidth = nodeWidth > this.NODE_MIN_WIDTH ? nodeWidth : this.NODE_MIN_WIDTH;
        return nodeWidth;
      });

    nodeInput
      .attr('transform', () => {
        let x = -Math.floor(this.HANDLER_WIDTH / 2),
          y = Math.floor(this.NODE_HEIGHT - this.HANDLER_HEIGHT) / 2;
        return `translate(${x}, ${y})`;
      })
      .select('rect')
      .attr('width', this.HANDLER_WIDTH)
      .attr('height', this.HANDLER_HEIGHT)
      .attr('rx', this.HANDLER_RADIUS)
      .attr('ry', this.HANDLER_RADIUS);

    nodeOutput
      .attr('transform', (d) => {
        let nodeWidth = (<any>nodeRect.node()).getBoundingClientRect().width;
        let x = nodeWidth - Math.floor(this.HANDLER_WIDTH / 2),
          y = Math.floor(this.NODE_HEIGHT - this.HANDLER_HEIGHT) / 2;
        return `translate(${x}, ${y})`;
      })
      .select('rect')
      .attr('width', this.HANDLER_WIDTH)
      .attr('height', this.HANDLER_HEIGHT)
      .attr('rx', this.HANDLER_RADIUS)
      .attr('ry', this.HANDLER_RADIUS);

    self.moveNodeLink();
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
    let connectable = t.node.connectable(s.node);
    console.log('connectable', connectable);
    if (!connectable) {
      t.node.accept(s.node);
      let newLink: CanvasLink = {
        source: s,
        target: t
      };
      this.links.push(newLink);
      this.drawNodeLink();
    }
  }

  private drawNodeLink = () => {
    let path = this.vis.selectAll('g.link').data(this.links);
    path.exit().remove();
    path.enter().insert('svg:g', ':first-child')
      .classed('link', true)
      .on('click', function () {

      })
      .insert('svg:path')
      .attr('stroke-width', this.PATH_STROKE_WIDTH)
      .attr('d', this.genLinkPathValueWithLink.bind(this));
  }

  // move the links of the node
  private moveNodeLink = () => {
    let path = this.vis.selectAll('g.link')
      .data(this.links).selectAll('path')
      .attr('d', this.genLinkPathValueWithLink.bind(this));
  }

  private genLinkPathValueWithLink (d: CanvasLink) {
    let {source, target} = getLinkPath.bind(this)(d.source, d.target);

    return this.genLinkPathValueWithPoints(source, target);

    function getLinkPath(s: CanvasNode, t: CanvasNode) {
      let self: D3HelperService = this;

      let outerLeft = self.canvas.node().getBoundingClientRect().left,
        outerTop = self.canvas.node().getBoundingClientRect().top;

      let targetNode = t.element;
      let sourceNode = s.element;

      let x1 = sourceNode.getBoundingClientRect().right - outerLeft;
      let y1 = sourceNode.getBoundingClientRect().top
        + Math.floor(sourceNode.getBoundingClientRect().height / 2) - outerTop;

      let x2 = targetNode.getBoundingClientRect().left - outerLeft;
      let y2 = targetNode.getBoundingClientRect().top
        + Math.floor(targetNode.getBoundingClientRect().height / 2) - outerTop;

      return {
        source: { x: x1, y: y1 },
        target: { x: x2, y: y2 }
      };
    }
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
