import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { JNBaseNode } from '../../../core/models/jn-base-node.type';
require('./bihisankey.js');

@Injectable()
export class D3HelperService {

  private node_width = 180;
  private node_height = 40;

  private activeNodes: JNBaseNode[];
  private vis: any;
  private drag: any;

  private data: JNBaseNode[] = [];

  constructor() {

  }

  start() {
    let self = this;
    let node_width = this.node_width;
    let node_height = this.node_height;

    var margin = { top: 20, right: 120, bottom: 20, left: 120 },
      space_width = 960 - margin.right - margin.left,
      space_height = 500 - margin.top - margin.bottom;

    var svg = d3.select('svg')
      .attr('width', space_width)
      .attr('height', space_height)
      .attr('pointer-events', 'all')
      .style('cursor', 'crosshair')
      .on('mousedown', function () {
        //focusView();
      });

    this.vis = svg
      .append('svg:g')
      .on('dblclick.zoom', null)
      .append('svg:g');

    this.drag = d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    function dragstarted(d) {
      d3.select(this).raise().classed('active', true);
    }

    function dragged(d) {
      d3.select(this)
        .attr('transform', function (d) {
          d.position = {
            x: Math.max(0, Math.min(space_width - node_width, d3.event.x)),
            y: Math.max(0, Math.min(space_height - node_height, d3.event.y))
          }
          d.x = d.position.x;
          d.y = d.position.y;
          return `translate(${d.position.x}, ${d.position.y})`;
        });
      self.updateLink(self.data[1], self.data[0]);
    }

    function dragended(d) {
      d3.select(this).classed('active', false);
    }
  }

  drawNode(node: any) {
    this.data = node;
    var rects = this.vis.selectAll('g.node').data(this.data);
    var g = rects.enter()
      .append('svg:g')
      .classed('node_group', true)
      .attr('transform', d => {
        d.x = d.position.x;
        d.y = d.position.y;
        return `translate(${d.position.x}, ${d.position.y})`;
      })
      .call(this.drag);
    g.insert('svg:rect')
      .classed('node', true)
      .attr('width', this.node_width)
      .attr('height', this.node_height)
      .attr('rx', 10)
      .attr('ry', 10)
      .on('mouseover', e => {
        // console.log(this);
        // console.log(e);
      });

    g.insert('svg:text')
      .attr('x', 50)
      .attr('y', 20)
      .text(d => {
        return d.constructor.name;
      });

    g.insert('svg:path')
      .attr('d', 'M 40 1 l 0 40');
      // .attr('stroke-opacity', '0.1')

    g.insert('svg:rect')
      .classed('port', true)
      .classed('input', true)
      .attr('width', 10)
      .attr('height', 10)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('transform', 'translate(-5, 15)');

    g.insert('svg:rect')
      .classed('port', true)
      .classed('output', true)
      .attr('width', 10)
      .attr('height', 10)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('transform', 'translate(175, 15)');

    this.drawLink(this.data[1], this.data[0]);
  }

  private line = (d) => {
    let self = this;
    let lineCurveScale = 0.75;
    let dy = d.target.y - (d.source.y + 1);
    let dx = (d.target.x - self.node_width / 2) - (d.source.x + self.node_width / 2);
    let delta = Math.sqrt(dy * dy + dx * dx);
    let scale = lineCurveScale;
    let scaleY = 0;
    if (delta < self.node_width) {
      scale = 0.75 - 0.75 * ((self.node_width - delta) / self.node_width);
    }

    if (dx < 0) {
      scale += 2 * (Math.min(5 * self.node_width, Math.abs(dx)) / (5 * self.node_width));
      if (Math.abs(dy) < 3 * self.node_height) {
        scaleY = ((dy > 0) ? 0.5 : -0.5) * (((3 * self.node_height) - Math.abs(dy)) / (3 * self.node_height)) * (Math.min(self.node_width, Math.abs(dx)) / (self.node_width));
      }
    }
    let v = `M${d.source.x + self.node_width + 5} ${d.source.y + 20} C ${d.source.x + self.node_width + scale * self.node_width} ${d.source.y + 20 + scaleY * self.node_height} ${d.target.x - scale * self.node_width} ${d.target.y + 20 - scaleY * self.node_height} ${d.target.x - 5} ${d.target.y + 20}`;
    return v;
  }

  private drawLink = (s, t) => {
    let linkData = {
      source: { x: s.x, y: s.y },
      target: { x: t.x, y: t.y }
    };
    let path = this.vis.selectAll('g.link').data([linkData]);
    path.enter()
      .insert('svg:g')
      .classed('link', true)
      .append('svg:path')
      .attr('d', this.line)
  }

  private updateLink = (s, t) => {
    let linkData = {
      source: { x: s.x, y: s.y },
      target: { x: t.x, y: t.y }
    };
    let path = this.vis.selectAll('g.link').selectAll('path').data([linkData]);
    path.attr('d', this.line);
  }
}
