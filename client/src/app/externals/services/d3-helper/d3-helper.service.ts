import { Events } from './../../../core/services/event.service';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNApplication } from '../../../core/services/application-core.service';

@Injectable()
export class D3HelperService {

  private readonly NODE_WIDTH = 180;
  private readonly NODE_HEIGHT = 40;

  private vis: any;
  private drag: any;

  private data: JNBaseNode[] = [];
  private links: number[][];
  private outputs: number[][];

  private select_node: JNBaseNode = null;
  private select_input = false;
  private select_output = false;
  private select_link = null;
  private select_brush = null;

  private input_dragging = false;
  private output_dragging = false;

  constructor(private events: Events) {

  }

  start() {
    let self = this;
    // let NODE_WIDTH = this.NODE_WIDTH;
    // let NODE_HEIGHT = this.NODE_HEIGHT;

    // var margin = { top: 20, right: 120, bottom: 20, left: 120 },
    //   space_width = 960 - margin.right - margin.left,
    //   space_height = 500 - margin.top - margin.bottom;
    let space_width = 960;
    let space_height = 500;

    var svg = d3.select('svg')
      .attr('width', space_width)
      .attr('height', space_height)
      .attr('pointer-events', 'all')
      .style('cursor', 'crosshair');

    this.vis = svg
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
      console.log('drag start');
      d3.select(this).raise().classed('active', true);
    }

    function dragging(d) {
      d3.select(this)
        .attr('transform', (d: any) => {
          d.position = {
            x: Math.max(0, Math.min(space_width - self.NODE_WIDTH, d3.event.x)),
            y: Math.max(0, Math.min(space_height - self.NODE_HEIGHT, d3.event.y))
          }
          d.x = d.position.x;
          d.y = d.position.y;
          return `translate(${d.position.x}, ${d.position.y})`;
        });
      // self.updateLink(self.data[1], self.data[0]);
    }

    function dragended(d) {
      d3.select(this).classed('active', false);
    }
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
      .on('dblclick', (d) => {
        this.events.emit('node_dblclick', d);
      })
      .call(this.drag);

    g.insert('svg:rect')
      .classed('node', true)
      .attr('width', this.NODE_WIDTH)
      .attr('height', this.NODE_HEIGHT)
      .attr('rx', 10)
      .attr('ry', 10);

    g.insert('svg:text')
      .attr('x', 50)
      .attr('y', 20)
      .text(d => {
        return d.constructor.name;
      });

    g.insert('svg:path')
      .attr('d', 'M 40 1 l 0 40');

    g.insert('svg:rect')
      .classed('port input', true)
      .attr('width', 10)
      .attr('height', 10)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('transform', 'translate(-5, 15)')
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
          console.log(target.connectable(d));
          if (!d.connectable(target)) {
            d.accept(target);
            self.shiftNodeLink({
              source: { x: target.position.x, y: target.position.y },
              target: { x: d.position.x, y: d.position.y }
            });
          }
        })
        .on('drag', (d: any) => {
          // let rect = d3.select(this).attr('transform');
          // let t = rect.substring(rect.indexOf("(") + 1, rect.indexOf(")")).split(",");
          let linkData = {
            target: { x: d.x - 5, y: d.y + this.NODE_HEIGHT / 2 },
            source: { x: d3.event.x, y: d3.event.y + this.NODE_HEIGHT / 2 }
          };
          this.mouseLink(linkData);
        })
      );

    g.insert('svg:rect')
      .classed('port output', true)
      .attr('width', 10)
      .attr('height', 10)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('transform', 'translate(175, 15)')
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
          console.log(target.connectable(d));
          if (!target.connectable(d)) {
            target.accept(d);
            self.shiftNodeLink({
              source: { x: d.position.x, y: d.position.y },
              target: { x: target.position.x, y: target.position.y }
            });
          }
        })
        .on('drag', (d: any) => {
          let linkData = {
            source: { x: d.x + this.NODE_WIDTH + 5, y: d.y + this.NODE_HEIGHT / 2 },
            target: { x: d3.event.x + this.NODE_WIDTH, y: d3.event.y + this.NODE_HEIGHT / 2 }
          };
          this.mouseLink(linkData);
        })
      );
  }

  private mouseLink = (linkData) => {
    let link = this.vis.selectAll('g.new_link').data([linkData]);
    link.select('path')
      .attr('d', this.genLinkPathValue);
    link.exit().remove();
    link.enter().insert('svg:g')
      .classed('new_link link', true)
      .append('svg:path')
      .attr('d', this.genLinkPathValue);
  }

  private shiftNodeLink = (linkData) => {
    linkData.source.x += this.NODE_WIDTH + 5;
    linkData.source.y += this.NODE_HEIGHT / 2;
    linkData.target.x -= 5;
    linkData.target.y += this.NODE_HEIGHT / 2;
    this.nodeLink(linkData);
  }
  private nodeLink = (linkData) => {
    let path = this.vis.selectAll('g.link').data([linkData]);
    path.enter()
      .insert('svg:g')
      .classed('link', true)
      .on('mousedown', function () {

      })
      .append('svg:path')
      .attr('d', this.genLinkPathValue)
  }

  private moveNodeLink = (linkData) => {
    let path = this.vis.selectAll('g.link').selectAll('path').data([linkData]);
    path.attr('d', this.genLinkPathValue);
  }

  private genLinkPathValue = (d) => {
    let self = this;
    let lineCurveScale = 0.75;
    let dy = d.target.y - (d.source.y + 1);
    let dx = (d.target.x - self.NODE_WIDTH / 2) - (d.source.x + self.NODE_WIDTH / 2);
    let delta = Math.sqrt(dy * dy + dx * dx);
    let scale = lineCurveScale;
    let scaleY = 0;
    if (delta < self.NODE_WIDTH) {
      scale = 0.75 - 0.75 * ((self.NODE_WIDTH - delta) / self.NODE_WIDTH);
    }

    if (dx < 0) {
      scale += 2 * (Math.min(5 * self.NODE_WIDTH, Math.abs(dx)) / (5 * self.NODE_WIDTH));
      if (Math.abs(dy) < 3 * self.NODE_HEIGHT) {
        scaleY = ((dy > 0) ? 0.5 : -0.5) * ((3 * self.NODE_HEIGHT - Math.abs(dy)) / (3 * self.NODE_HEIGHT)) * (Math.min(self.NODE_WIDTH, Math.abs(dx)) / self.NODE_WIDTH);
      }
    }

    // let v = `M${d.source.x + self.NODE_WIDTH + 5} ${d.source.y + self.NODE_HEIGHT / 2} C ${d.source.x + self.NODE_WIDTH + scale * self.NODE_WIDTH} ${d.source.y + self.NODE_HEIGHT / 2 + scaleY * self.NODE_HEIGHT} ${d.target.x - scale * self.NODE_WIDTH} ${d.target.y + self.NODE_HEIGHT / 2 - scaleY * self.NODE_HEIGHT} ${d.target.x - 5} ${d.target.y + self.NODE_HEIGHT / 2}`;
    let v = `M${d.source.x} ${d.source.y} C ${d.source.x + scale * self.NODE_WIDTH} ${d.source.y + scaleY * self.NODE_HEIGHT} ${d.target.x - scale * self.NODE_WIDTH} ${d.target.y - scaleY * self.NODE_HEIGHT} ${d.target.x} ${d.target.y}`;
    return v;
  }
}
