import { JNFlow } from './../../../../core/models/jn-flow.type';
import { Events } from './../../../../core/services/event.service';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type'
import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export class D3HelperService {

  private readonly NODE_WIDTH = 180;
  private readonly NODE_HEIGHT = 40;
  private space_width = 1464;
  private space_height = 944;

  private vis: any;
  private drag: any;

  private data: any[];
  private links: any[];
  private inputs: number[][];
  private outputs: number[][];

  private select_node = null;
  private select_input = null;
  private select_output = null;
  private select_link = null;
  private select_brush = null;

  private input_dragging = false;
  private output_dragging = false;

  nodeFlow: JNFlow;

  constructor(private events: Events) {
    this.nodeFlow = new JNFlow();
    this.data = [];
    this.links = [];
    this.inputs = [];
    this.outputs = [];
  }

  init() {
    let self = this;
    // let NODE_WIDTH = this.NODE_WIDTH;
    // let NODE_HEIGHT = this.NODE_HEIGHT;

    // var margin = { top: 20, right: 120, bottom: 20, left: 120 },
    //   space_width = 960 - margin.right - margin.left,
    //   space_height = 500 - margin.top - margin.bottom;

    let shift = null;
    let svg = d3.select('svg')
      .attr('width', this.space_width)
      .attr('height', this.space_height)
      .attr('pointer-events', 'all')
      .style('cursor', 'crosshair')
      .on('mousedown', mousedown)
      .on('mouseup', mouseup)
      .on('mousemove', moving);

    this.vis = svg
      .append('svg:g')
      .on('dblclick.zoom', null)
      .append('svg:g');

    function mousedown() {
      d3.event.preventDefault();
      if (d3.event.button !== 0) return;
      if (self.select_node) {
        let mouse_position = d3.mouse(this);
        shift = {
          x: mouse_position[0] - self.select_node.x,
          y: mouse_position[1] - self.select_node.y,
        }
      }
    }

    function mouseup() {
      console.log('global mouseup')

      self.vis.selectAll('g.new_link').remove();
      if (self.output_dragging && self.select_input && self.select_node) {
        self.createLink(self.select_input, self.select_node);
      }
      if (self.input_dragging && self.select_output && self.select_node) {
        self.createLink(self.select_node, self.select_output);
      }

      self.select_node = null;
      self.select_input = null;
      self.select_output = null;
      self.input_dragging = false;
      self.output_dragging = false;
    }

    function moving() {
      let d = self.select_node;
      let position = d3.mouse(this);

      if (self.input_dragging) {
        let linkData = {
          source: { x: position[0], y: position[1] },
          target: { x: d.x - 5, y: d.y + self.NODE_HEIGHT / 2 }
        };
        self.mouseLink(linkData);
        return;
      }

      if (self.output_dragging) {
        let linkData = {
          source: { x: d.x + self.NODE_WIDTH + 5, y: d.y + self.NODE_HEIGHT / 2 },
          target: { x: position[0], y: position[1] }
        };
        self.mouseLink(linkData);
        return;
      }

      if (self.select_node) {
        position[0] -= shift.x;
        position[1] -= shift.y;
        d.x = Math.max(0, Math.min(self.space_width - self.NODE_WIDTH, position[0]));
        d.y = Math.max(0, Math.min(self.space_height - self.NODE_HEIGHT, position[1]));
        self.vis.selectAll('g.node_group').filter(function (dt) { return dt.id === d.id; })
          .attr('transform', (d: any) => {
            return `translate(${d.x}, ${d.y})`;
          });

        self.inputs[d.id].forEach(i => {
          self.links[i].target.x = d.x - 5;
          self.links[i].target.y = d.y + self.NODE_HEIGHT / 2;
        });
        self.outputs[d.id].forEach(i => {
          self.links[i].source.x = d.x + self.NODE_WIDTH + 5;;
          self.links[i].source.y = d.y + self.NODE_HEIGHT / 2;;
        });
        self.moveNodeLink();

        let node = self.nodeFlow.nodes[d.id];
        node.position = {
          x: d.x,
          y: d.y
        }
      }
    }
  }

  addNode<T extends JNBaseNode>(nodeType: { new (): T }, data?) {
    this.nodeFlow.createNode(nodeType, data);
    this.data.push({
      id: this.data.length,
      x: data.position.x,
      y: data.position.y
    });
    this.inputs.push([]);
    this.outputs.push([]);
    this.drawNode();
  }

  drawNode() {
    let self = this;
    let rects = this.vis.selectAll('g.node_group').data(this.data);
    rects.exit().remove();

    let g = rects.enter()
      .append('svg:g')
      .classed('node_group', true)
      .attr('transform', (d: any) => {
        return `translate(${d.x}, ${d.y})`;
      })
      .on('click', d => {
        this.events.emit('node_click', this.nodeFlow.nodes[d.id]);
      })
      .on('dblclick', d => {
        this.events.emit('node_dblclick', this.nodeFlow.nodes[d.id]);
      })
      .on('mousedown', d => {
        console.log('node down');
        if (d3.event.button === 0)
          this.select_node = d;
      })
      .on('mouseup', d => {
        console.log('node up');
        this.select_node = null;
      });

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
        return this.nodeFlow.nodes[d.id].constructor.name;
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
        self.select_input = d;
      })
      .on('mouseout', function (d) {
        d3.select(this).classed('hover', false);
      })
      .on('mousedown', function (d) {
        console.log('input down');
        self.select_node = d;
        self.input_dragging = true;
      })
      .on('mouseup', function (d) {
        console.log('input up');
        self.select_node = null;
        self.input_dragging = false;
      });

    g.insert('svg:rect')
      .classed('port output', true)
      .attr('width', 10)
      .attr('height', 10)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('transform', 'translate(175, 15)')
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
        self.select_output = d;
      })
      .on('mouseout', function (d) {
        d3.select(this).classed('hover', false);
      })
      .on('mousedown', function (d) {
        console.log('output down');
        self.select_node = d;
        self.output_dragging = true;
      })
      .on('mouseup', function (d) {
        console.log('output up');
        self.select_node = null;
        self.output_dragging = false;
      });
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

  private createLink = (s: any, t: any) => {
    let sNode = this.nodeFlow.nodes[s.id];
    let tNode = this.nodeFlow.nodes[t.id];
    let connectable = sNode.connectable(tNode);
    console.log('connectable', connectable);
    if (!connectable) {
      sNode.accept(tNode);
      let newLink = {
        source: { x: t.x, y: t.y },
        target: { x: s.x, y: s.y }
      };
      let i = this.data.indexOf(s);
      this.inputs[i].push(this.links.length);
      i = this.data.indexOf(t);
      this.outputs[i].push(this.links.length);
      this.links.push(newLink);
      this.shiftNodeLink(newLink);
    }
  }

  private shiftNodeLink = (linkData) => {
    linkData.source.x += this.NODE_WIDTH + 5;
    linkData.source.y += this.NODE_HEIGHT / 2;
    linkData.target.x -= 5;
    linkData.target.y += this.NODE_HEIGHT / 2;
    this.nodeLink();
  }

  private nodeLink = () => {
    let path = this.vis.selectAll('g.link').data(this.links);
    path.enter()
      .insert('svg:g')
      .classed('link', true)
      .on('mousedown', function () {

      })
      .append('svg:path')
      .attr('stroke-width', 2)
      .attr('d', this.genLinkPathValue)
  }

  private moveNodeLink = () => {
    let path = this.vis.selectAll('g.link').data(this.links).selectAll('path');
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
