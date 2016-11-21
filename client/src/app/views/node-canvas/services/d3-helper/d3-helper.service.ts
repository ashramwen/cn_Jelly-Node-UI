import { JNFlow } from './../../../../core/models/jn-flow.type';
import { Events } from './../../../../core/services/event.service';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { JNUtils } from '../../../../share/util';

interface CanvasPoint {
  x: number;
  y: number;
}

interface CanvasLink {
  target: JNBaseNode;
  source: JNBaseNode;
}

@Injectable()
export class D3HelperService {
  nodeFlow: JNFlow;

  private readonly NODE_MAX_WIDTH = 180;
  private readonly NODE_MIN_WIDTH = 100;
  private readonly NODE_RADIUS = 5;
  private readonly NODE_HEIGHT = 34;
  private readonly NODE_PADDING = 10;
  private readonly NODE_ICON_HOLDER_WIDTH = 30;
  private readonly HANDLER_WIDTH = 10;
  private readonly HANDLER_HEIGHT = 10;
  private readonly FONT_SIZE = 13;
  private readonly PATH_STROKE_WIDTH = 2;

  private vis: any;
  private canvas: any;
  private drag: any;

  private data: JNBaseNode[] = [];
  private dataMapper: Map<JNBaseNode, any>;
  private links: any[];

  private select_node: JNBaseNode = null;
  private select_input = false;
  private select_output = false;
  private select_link = null;
  private select_brush = null;

  private input_dragging = false;
  private output_dragging = false;


  constructor(private events: Events) {
    this.nodeFlow = new JNFlow();
    this.links = [];
  }

  init(svg: Element) {
    let self = this;
    this.dataMapper = new Map<JNBaseNode, any>();
    // let NODE_WIDTH = this.NODE_WIDTH;
    // let NODE_HEIGHT = this.NODE_HEIGHT;

    // var margin = { top: 20, right: 120, bottom: 20, left: 120 },
    //   space_width = 960 - margin.right - margin.left,
    //   space_height = 500 - margin.top - margin.bottom;
    let space_width = 1464;
    let space_height = 444;

    this.canvas = d3.select(svg)
      .attr('width', space_width)
      .attr('height', space_height)
      .attr('pointer-events', 'all')
      .style('cursor', 'crosshair');

    this.vis = this.canvas
      .append('svg:g')
      .on('dblclick.zoom', null)
      .append('svg:g')
      .on('mousedown', function () {
      });

    this.drag = d3.drag()
      .on('start', dragstarted)
      .on('drag', dragging)
      .on('end', dragended);

    function dragstarted(d) {
      d3.select(this).raise().classed('active', true);
    }

    function dragging(d) {
      d3.select(this)
        .attr('transform', (d: any, i, eles) => {
          let ele = eles[i];
          let {width, height} = ele.getBoundingClientRect();
          d.position = {
            x: Math.max(0, Math.min(space_width - width, d3.event.x)),
            y: Math.max(0, Math.min(space_height - height, d3.event.y))
          };
          d.x = d.position.x;
          d.y = d.position.y;
          return `translate(${d.position.x}, ${d.position.y})`;
        });
      self.moveNodeLink();
    }

    function dragended(d) {
      d3.select(this).classed('active', false);
    }
  }

  addNode() {
  }

  drawNode(node: any) {
    let self = this;
    this.data = node;
    let rects = this.vis.selectAll('g.node_group').data(this.data);
    rects.exit().remove();

    let g = rects.enter()
      .append('svg:g')
      .classed('node_group', true)
      .attr('transform', (d: any) => {
        d.x = d.position.x;
        d.y = d.position.y;
        return `translate(${d.position.x}, ${d.position.y})`;
      })
      .on('click', (d) => {
        this.events.emit('node_click', d);
      })
      .on('dblclick', (d) => {
        this.events.emit('node_dblclick', d);
      })
      .call(this.drag)
      .each((d, i, eles) => {
        this.dataMapper.set(d, eles[i]);
      });

    g.insert('svg:rect')
      .classed('node', true)
      .attr('height', this.NODE_HEIGHT)
      .attr('rx', this.NODE_RADIUS)
      .attr('ry', this.NODE_RADIUS);

    g.insert('svg:text')
      .attr('x', this.NODE_ICON_HOLDER_WIDTH + this.NODE_PADDING)
      .style('font-size', this.FONT_SIZE)
      .text(d => {
        return d.constructor.name;
      }).each((data, i, e) => {
        let textEle = e[i];
        let textLength = textEle.getComputedTextLength(),
          text = textEle.textContent;
        while (textLength > (self.NODE_MAX_WIDTH - 2 * self.NODE_PADDING - this.NODE_ICON_HOLDER_WIDTH) && text.length > 0) {
          text = text.slice(0, -1);
          textEle.textContent = text;
          textLength = textEle.getComputedTextLength();
        }
      });

    // adjust node width and text position
    let textEle = g.select('text').node();
    let textWidth = textEle.getComputedTextLength();
    let textHeight = textEle.getBoundingClientRect().height;

    let nodeWidth = this.NODE_PADDING * 2 + this.NODE_ICON_HOLDER_WIDTH + textWidth;
    nodeWidth = nodeWidth > this.NODE_MIN_WIDTH ? nodeWidth : this.NODE_MIN_WIDTH;
    g.select('text')
      .attr('y', Math.floor(this.NODE_HEIGHT - textHeight));
    g.select('rect')
      .attr('width', nodeWidth);

    // add vertical hr
    g.insert('svg:path')
      .attr('d', `M ${this.NODE_ICON_HOLDER_WIDTH} 1 l 0 ${this.NODE_HEIGHT}`);

    // add input port
    g.insert('svg:rect')
      .classed('port input', true)
      .attr('width', this.HANDLER_WIDTH)
      .attr('height', this.HANDLER_HEIGHT)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('transform', `translate(-${Math.floor(this.HANDLER_WIDTH / 2)}, ${Math.floor(this.NODE_HEIGHT - this.HANDLER_HEIGHT) / 2})`)
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
        self.select_node = d;
        self.select_input = true;
        // console.log('node:', self.select_node);
      })
      .on('mouseout', function (d) {
        d3.select(this).classed('hover', false);
        self.select_node = null;
        self.select_input = false;
        // console.log('node:', self.select_node);
      })
      .call(d3.drag()
        .on('start', d => {
          this.input_dragging = true;
        })
        .on('end', (d: JNBaseNode) => {
          this.vis.selectAll('g.new_link').remove();
          this.input_dragging = false;
          if (!this.select_output) return;
          let target = self.select_node;
          createLink(target, d);
        })
        .on('drag', (d: any) => {
          // let rect = d3.select(this).attr('transform');
          // let t = rect.substring(rect.indexOf("(") + 1, rect.indexOf(")")).split(",");
          let linkData = {
            source: { x: d3.event.x, y: d3.event.y + Math.floor(this.NODE_HEIGHT / 2) },
            target: { x: d.x - Math.floor(this.HANDLER_WIDTH / 2), y: d.y + this.NODE_HEIGHT / 2 }
          };
          this.mouseLink(linkData);
        })
      );

    g.insert('svg:rect')
      .classed('port output', true)
      .attr('width', this.HANDLER_WIDTH)
      .attr('height', this.HANDLER_HEIGHT)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('transform', `translate(${nodeWidth - Math.floor(this.HANDLER_WIDTH / 2)}, ${Math.floor(this.NODE_HEIGHT - this.HANDLER_HEIGHT) / 2})`)
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
        self.select_node = d;
        self.select_output = true;
        // console.log('node:', self.select_node);
      })
      .on('mouseout', function (d) {
        d3.select(this).classed('hover', false);
        self.select_node = null;
        self.select_output = false;
        // console.log('node:', self.select_node);
      })
      .call(d3.drag()
        .on('start', (d: any) => {
          this.output_dragging = true;
        })
        .on('end', (d: JNBaseNode) => {
          this.vis.selectAll('g.new_link').remove();
          this.output_dragging = false;
          if (!this.select_input) return;
          let target = self.select_node;
          createLink(d, target);
        })
        .on('drag', (d: any) => {
          let linkData = {
            source: { x: d.x + nodeWidth + 5, y: d.y + Math.floor(this.NODE_HEIGHT / 2) },
            target: { x: d3.event.x + nodeWidth, y: d3.event.y + Math.floor(this.NODE_HEIGHT / 2) }
          };
          this.mouseLink(linkData);
        })
      );

    let createLink = (s: JNBaseNode, t: JNBaseNode) => {
      let connectable = t.connectable(s);
      console.log('connectable', connectable);
      if (!connectable) {
        t.accept(s);
        let newLink: CanvasLink = {
          source: s,
          target: t
        };
        this.links.push(newLink);
        this.nodeLink();
      }
    };
  }

  private mouseLink = (linkData) => {
    let link = this.vis.selectAll('g.new_link').data([linkData]);
    link.select('path')
      .attr('d', (d) =>  this.genLinkPathValueWithPoints(d.source, d.target));
    link.exit().remove();
    link.enter().insert('svg:g')
      .classed('new_link link', true)
      .append('svg:path')
      .attr('d', (d) =>  this.genLinkPathValueWithPoints(d.source, d.target));
  }

  /**
   * draw links
   */
  private nodeLink = () => {
    let self = this;

    let path = this.vis.selectAll('g.link').data(this.links);
    path.enter()
      .insert('svg:g')
      .classed('link', true)
      .on('mousedown', function () {

      })
      .append('svg:path')
      .attr('stroke-width', this.PATH_STROKE_WIDTH)
      .attr('d', this.genLinkPathValueWithLink.bind(this));
  }

  private moveNodeLink = () => {
    this.vis.selectAll('g.link')
      .data(this.links)
      .selectAll('path')
      .attr('d', this.genLinkPathValueWithLink.bind(this));
  }

  private genLinkPathValueWithLink (d: CanvasLink) {
    let {source, target} = getLinkPath.bind(this)(d.source, d.target);

    return this.genLinkPathValueWithPoints(source, target);

    function getLinkPath(s: JNBaseNode, t: JNBaseNode) {
      let self: D3HelperService = this;

      let outerLeft = self.canvas.node().getBoundingClientRect().left,
        outerTop = self.canvas.node().getBoundingClientRect().top;

      let targetNode = self.dataMapper.get(t);
      let sourceNode = self.dataMapper.get(s);

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
  private genLinkPathValueWithPoints = (source: CanvasPoint, target: CanvasPoint) => {
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
