import { JNFlow } from './../../../../core/models/jn-flow.type';
import { Events } from './../../../../core/services/event.service';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type'
import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import * as d3 from 'd3';

class CanvasPoint {
  x: number;
  y: number;
  constructor(node: CanvasNode) {
    this.x = node.x;
    this.y = node.y;
  }
}

class CanvasNode {
  node: JNBaseNode;
  x: number;
  y: number;
  width: number;
  inputs: number[] = [];
  outputs: number[] = [];

  constructor(node: JNBaseNode) {
    this.node = node;
    this.x = node.position.x;
    this.y = node.position.y;
  }
}

@Injectable()
export class D3HelperService {

  private space_width = 1464;
  private space_height = 944;

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

  private data: CanvasNode[];
  private links: any[];

  private select_node: CanvasNode = null;

  private select_link = null;
  private select_brush = null;

  private input_dragging = false;
  private output_dragging = false;

  constructor(private events: Events, private translate: TranslateService) {
    this.data = [];
    this.links = [];
  }

  init(svg: Element) {
    let self = this;
    // var margin = { top: 20, right: 120, bottom: 20, left: 120 },
    //   space_width = 960 - margin.right - margin.left,
    //   space_height = 500 - margin.top - margin.bottom;

    let canvas = d3.select(svg)
      .attr('width', this.space_width)
      .attr('height', this.space_height)
      .attr('pointer-events', 'all')
      .style('cursor', 'crosshair')
      .on('mousedown', mousedown)
      .on('mouseup', mouseup)
      .on('mousemove', moving);

    this.vis = canvas
      .append('svg:g')
      .on('dblclick.zoom', null)
      .append('svg:g');

    let shift = null;

    function mousedown() {
      d3.event.preventDefault();
      if (d3.event.button !== 0) return;
      if (self.select_node) {
        let mouse_position = d3.mouse(this);
        console.log(self.select_node);
        shift = {
          x: mouse_position[0] - self.select_node.x,
          y: mouse_position[1] - self.select_node.y,
        }
      }
    }

    function mouseup() {
      console.log('global mouseup')
      self.vis.selectAll('g.new_link').remove();
      self.select_node = null;
      self.input_dragging = false;
      self.output_dragging = false;
    }

    function moving() {
      d3.event.preventDefault();
      let d = self.select_node;
      let position = d3.mouse(this);

      // create&move mouse-link from input
      if (self.input_dragging && d) {
        let linkData = {
          source: { x: position[0], y: position[1] },
          target: { x: d.x - self.HANDLER_WIDTH / 2, y: d.y + self.NODE_HEIGHT / 2 }
        };
        self.moveMouseLink(linkData);
        return;
      }

      // create&move mouse-link from output
      if (self.output_dragging && d) {
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
        d.x = Math.max(0, Math.min(self.space_width - d.width, position[0]));
        d.y = Math.max(0, Math.min(self.space_height - self.NODE_HEIGHT, position[1]));
        self.vis.selectAll('g.node_group').filter((dt: CanvasNode) => { return dt.node.body.nodeID === d.node.body.nodeID; })
          .attr('transform', (d: any, i, ele) => {
            return `translate(${d.x}, ${d.y})`;
          });

        d.inputs.forEach(i => {
          self.links[i].target.x = d.x - self.HANDLER_WIDTH / 2;
          self.links[i].target.y = d.y + self.NODE_HEIGHT / 2;
        });
        d.outputs.forEach(i => {
          self.links[i].source.x = d.x + d.width + self.HANDLER_WIDTH / 2;
          self.links[i].source.y = d.y + self.NODE_HEIGHT / 2;;
        });
        self.moveNodeLink();

        d.node.position = {
          x: d.x,
          y: d.y
        };
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
      .attr('transform', (d: any) => {
        return `translate(${d.x}, ${d.y})`;
      })
      .on('click', d => {
        this.events.emit('node_click', d.node);
      })
      .on('dblclick', d => {
        this.events.emit('node_dblclick', d.node);
      })
      .on('mousedown', d => {
        console.log('node down');
        if (d3.event.button !== 0) return;
        this.select_node = d;
      })
      .on('mouseup', d => {
        console.log('node up');
        this.select_node = null;
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
      .style('font-size', this.FONT_SIZE)
      .text((d: CanvasNode) => {
        let name = d.node.name;
        this.translate.get(name).subscribe((nameTranslated) => {
          name = nameTranslated || name;
        });
        return name;
      })
      .each((data, i, e) => {
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
      .attr('width', nodeWidth)
      .each((d: CanvasNode, i, e) => {
        d.width = nodeWidth;
      });

    // node icon right path
    g.insert('svg:path')
      .attr('d', `M ${this.NODE_HEIGHT} 1 l 0 ${this.NODE_HEIGHT}`);

    // node input
    g.insert('svg:g')
      .classed('port input', true)
      .attr('transform', `translate(-${Math.floor(this.HANDLER_WIDTH / 2)}, ${Math.floor(this.NODE_HEIGHT - this.HANDLER_HEIGHT) / 2})`)
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
      })
      .on('mouseleave', function (d) {
        d3.select(this).classed('hover', false);
      })
      .on('mousedown', function (d) {
        console.log('input down');
        if (d3.event.button !== 0) return;
        self.select_node = d;
        self.input_dragging = true;
      })
      .on('mouseup', function (d) {
        console.log('input up');
        if (self.select_node) {
          self.createNodeLink(self.select_node, d);
        }
        self.select_node = null;
        self.input_dragging = false;
      })
      .insert('svg:rect')
      .attr('width', this.HANDLER_WIDTH)
      .attr('height', this.HANDLER_HEIGHT)
      .attr('rx', this.HANDLER_RADIUS)
      .attr('ry', this.HANDLER_RADIUS);

    // node output
    g.insert('svg:g')
      .classed('port output', true)
      .attr('transform', `translate(${nodeWidth - Math.floor(this.HANDLER_WIDTH / 2)}, ${Math.floor(this.NODE_HEIGHT - this.HANDLER_HEIGHT) / 2})`)
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
      })
      .on('mouseleave', function (d) {
        d3.select(this).classed('hover', false);
      })
      .on('mousedown', function (d) {
        console.log('output down');
        if (d3.event.button !== 0) return;
        self.select_node = d;
        self.output_dragging = true;
      })
      .on('mouseup', function (d) {
        console.log('output up');
        if (self.select_node) {
          self.createNodeLink(d, self.select_node);
        }
        self.select_node = null;
        self.output_dragging = false;
      })
      .insert('svg:rect')
      .attr('width', this.HANDLER_WIDTH)
      .attr('height', this.HANDLER_HEIGHT)
      .attr('rx', this.HANDLER_RADIUS)
      .attr('ry', this.HANDLER_RADIUS);
  }

  private moveMouseLink = (linkData) => {
    let link = this.vis.selectAll('g.new_link').data([linkData]);
    link.exit().remove();
    link.enter().insert('svg:g', ':first-child')
      .classed('new_link', true)
      .insert('svg:path')
      .attr('d', this.genLinkPathValue);
    link.select('path')
      .attr('d', this.genLinkPathValue);
  }

  private createNodeLink = (s: CanvasNode, t: CanvasNode) => {
    let connectable = s.node.connectable(t.node);
    console.log('connectable', connectable);
    if (!connectable) {
      s.node.accept(t.node);
      let newLink = {
        source: { x: s.x + s.width, y: s.y },
        target: { x: t.x, y: t.y }
      };
      s.outputs.push(this.links.length);
      t.inputs.push(this.links.length);
      this.shiftNodeLink(newLink);
    }
  }

  private shiftNodeLink = (linkData) => {
    linkData.source.x += this.HANDLER_WIDTH / 2;
    linkData.source.y += Math.floor(this.NODE_HEIGHT / 2);
    linkData.target.x -= this.HANDLER_WIDTH / 2;
    linkData.target.y += Math.floor(this.NODE_HEIGHT / 2);
    this.links.push(linkData);
    this.drawNodeLink.bind(this)();
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
      .attr('d', this.genLinkPathValue)
  }

  // move the links of the node
  private moveNodeLink = () => {
    let path = this.vis.selectAll('g.link').data(this.links).selectAll('path');
    path.attr('d', this.genLinkPathValue);
  }

  // generate the value of link path
  private genLinkPathValue = (d) => {
    let self = this;
    let source = d.source;
    let target = d.target;
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
