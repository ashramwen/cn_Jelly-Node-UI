import { JNFlow } from './../../../../core/models/jn-flow.type';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type'
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

@Injectable()
export class D3HelperService {

  private vis: any;
  private canvasContainer: any;
  private canvas: any;
  private brush: any;
  private tip: any;

  private nodes: CanvasNode[];
  private links: CanvasLink[];

  private selections: CanvasObject[];  
  private selectLink = null;
  private selectBrush = null;

  private sourceNode: CanvasNode = null;
  private targetNode: CanvasNode = null;
  private _shift: Array<{ x: number, y: number }> = [];
  private NodeSettings: INodeSettings;

  constructor(
    private events: Events,
    private translate: TranslateService,
    private _sanitizer: Sanitizer,
    private injector: Injector
  ) {
    this.nodes = [];
    this.links = [];
    this.selections = [];
    let externalSettings = injector.get(JN_NODE_SETTING);
    this.NodeSettings = {};

    Object.assign(this.NodeSettings, NodeSettings, externalSettings); 
  }

  init(container: Element) {
    let self = this;
    let svg = d3.select(container).append('svg');

    this.canvasContainer = svg
      .attr('width', this.NodeSettings.CANVAS_WIDTH)
      .attr('height', this.NodeSettings.CANVAS_HEIGHT)
      .attr('pointer-events', 'all')
      .style('cursor', 'crosshair');
    
    this.canvas = this.canvasContainer.append('g');
    
    this.brush = this.canvas
      .append('g')
      .attr('class', 'brush')
      .attr('id', 'brush-wrapper')
      .call(d3.brush()
        .on('start', () => {
          self.brush.raise();
          var e = d3.event.target.extent();
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
          
          self.updateNodes.bind(self)();
          self.updateLinks.bind(self)();
        }));
      
    this.vis = this.canvas
      .append('svg:g')
      .on('dblclick.zoom', null)
      .append('svg:g');
    
    this.tip = d3.select(container)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  }

  loadNodes(nodes: JNBaseNode[]) {
    this.nodes = [];
    this.links = [];
    this.selections = [];

    nodes.forEach((n) => {
      this.addNode(n);
    });

    nodes.forEach(t => {
      t.accepted.forEach(s => {
        let target = this.nodes
          .find(d => d.node === t);
        let source = this.nodes.find(d => d.node === s);
        this.addLink(source, target);
      });
    });
    this.select([]);
  }

  addNode(node: JNBaseNode) {
    let canvasNode = new CanvasNode(node, this.canvas.node());
    this.nodes.push(canvasNode);
    this.drawNodes();
    this.select(canvasNode);
  }

  drawNodes() {
    let self = this;
    
    let rects = this.vis
      .selectAll('g.node-group')
      .data(this.nodes);
    
    let shift = null;

    // node group
    let g = rects.enter()
      .append('svg:g')
      .classed('node-group', true)
      .on('click', d => {
        self.select(d);
        self.events.emit('node_click', d.node);
      })
      .on('dblclick', d => {
        self.events.emit('node_dblclick', d.node);
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
        .on('start', function(d: CanvasNode){
          if (!self.selections || self.selections.indexOf(d) < 0) {
            self.select(d);
          }
          self.hideTip();
          self.dragStart.apply(self, arguments);
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
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
        self.targetNode = d;
        if (self.sourceNode) {
          console.log(self.sourceNode.node.connectable(d));
        }
      })
      .on('mouseleave', function (d) {
        d3.select(this).classed('hover', false);
        self.targetNode = null;
      })
      .call(d3.drag()
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
          self.sourceNode = null;
          self.targetNode = null;
        })
      )
      .insert('svg:rect');

    // node output
    g.insert('svg:g')
      .classed('port output', true)
      .on('mouseenter', function (d) {
        d3.select(this).classed('hover', true);
        self.sourceNode = d;
        if (self.targetNode) {
          console.log(self.targetNode.node.connectable(d));
        }
      })
      .on('mouseleave', function (d) {
        d3.select(this).classed('hover', false);
        self.sourceNode = null;
      })
      .call(d3.drag()
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
          self.sourceNode = null;
          self.targetNode = null;
        })
      )
      .insert('svg:rect');
    
    rects.exit().remove();
    this.updateNodes();
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
    this.canvasContainer
      .attr('width', maxWidth)
      .attr('height', maxHeight)
      .classed('selected', d => !!this.selections.length);
  }

  public updateNodes() {
    let self = this;

    // adjust node width and text position
    let nodes = this.vis.selectAll('g.node-group')
      .data(this.nodes)
      .each((n: CanvasNode, i, eles: Element) => {
        n.element = eles[i];
        d3.select(eles[i]).selectAll('text').datum(n);
        d3.select(eles[i]).select('rect').datum(n);
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
      .attr('x', () => {
        return self.NodeSettings.NODE_PADDING;
      })
      .attr('y', () => {
        return self.NodeSettings.NODE_HEIGHT / 2 + self.NodeSettings.NODE_ICON_HOLDER_WIDTH/2;
      })
      .attr('font-family', 'icomoon')
      .style('font-size', `${self.NodeSettings.NODE_ICON_HOLDER_WIDTH}px`)
      .text((d: CanvasNode)=>{
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
        let textEle = eles[j];
        let textHeight = textEle.getBoundingClientRect().height;
        return Math.floor(this.NodeSettings.NODE_HEIGHT/2 + textHeight/2);
      });
    
    nodeRect
      .attr('width', (n: CanvasNode) => {
        let textEle: SVGTextElement = <SVGTextElement>d3.select(n.element).select('text.node-title').node();
        let textWidth = textEle.getComputedTextLength();
        let nodeWidth = this.NodeSettings.NODE_PADDING * 3 + this.NodeSettings.NODE_ICON_HOLDER_WIDTH + textWidth;
        nodeWidth = nodeWidth > this.NodeSettings.NODE_MIN_WIDTH ? nodeWidth : this.NodeSettings.NODE_MIN_WIDTH;

        d3.select(textEle)
          .attr('x', (d: CanvasNode, i, eles) => {
            return nodeWidth - textWidth - this.NodeSettings.NODE_PADDING;
          });
        return nodeWidth;
      });

    nodeInput
      .style('display', (n: CanvasNode) => {
        return n.hasInput ? 'block' : 'none';
      })
      .attr('transform', () => {
        let x = -Math.floor(this.NodeSettings.HANDLER_WIDTH / 2),
          y = Math.floor(this.NodeSettings.NODE_HEIGHT - this.NodeSettings.HANDLER_HEIGHT) / 2;
        return `translate(${x}, ${y})`;
      })
      .select('rect')
      .attr('width', this.NodeSettings.HANDLER_WIDTH)
      .attr('height', this.NodeSettings.HANDLER_HEIGHT)
      .attr('rx', this.NodeSettings.HANDLER_RADIUS)
      .attr('ry', this.NodeSettings.HANDLER_RADIUS);

    nodeOutput
      .style('display', (n: CanvasNode) => {
        return n.hasOutput ? 'block' : 'none';
      })
      .attr('transform', (d: CanvasNode) => {
        let rectEle: SVGSVGElement = <SVGSVGElement>d3.select(d.element).select('rect').node();
        let nodeWidth = rectEle.getBoundingClientRect().width;
        let x = nodeWidth - Math.floor(this.NodeSettings.HANDLER_WIDTH / 2),
          y = Math.floor(this.NodeSettings.NODE_HEIGHT - this.NodeSettings.HANDLER_HEIGHT) / 2;
        return `translate(${x}, ${y})`;
      })
      .select('rect')
      .attr('width', this.NodeSettings.HANDLER_WIDTH)
      .attr('height', this.NodeSettings.HANDLER_HEIGHT)
      .attr('rx', this.NodeSettings.HANDLER_RADIUS)
      .attr('ry', this.NodeSettings.HANDLER_RADIUS);

    nodes.exit().remove();
    self.updateLinks();
    self.updateCanvasContainer();
  }

  private removeNode(node: CanvasNode) {
    this.links
      .filter(link => link.source === node || link.target === node)
      .forEach(this.removeLink.bind(this));
    
    JNUtils.removeItem(this.nodes, node);
    this.events.emit(NODE_EVENTS.NODE_DELETE, node.node);
    this.drawNodes();
  }

  private removeLink(link: CanvasLink) {
    if (this.links.indexOf(link) === -1) return; 
    JNUtils.removeItem(this.links, link);
    this.events.emit(NODE_EVENTS.LINK_DELETE, {source: link.source.node, target: link.target.node});
    this.drawLinks();
  }

  private select(o: CanvasObject[] | CanvasObject) {
    if (o instanceof Array) {
      this.selections = o;
    } else {
      this.selections = [o];
    }
    let nodes = this.selections
      .filter(o => o instanceof CanvasNode)
      .map((n: CanvasNode) => n.node);
    this.events.emit(NODE_EVENTS.SELECTION_CHANGED, nodes);
    this.updateNodes();
  }

  private dragStart() {
    let position = d3.mouse(this.canvas.node());
    this._shift = this.selections
      .filter((o) => {
        return o instanceof CanvasNode;
      })
      .map((o) => {
        return {
          x: position[0] - o.x,
          y: position[1] - o.y
        };
      });
  }

  private dragMove() {
    let position = d3.mouse(this.canvas.node());
    this.selections
      .filter((o) => {
        return o instanceof CanvasNode;
      })
      .forEach((n: CanvasNode, i) => {
        n.position = {
          x: position[0] - this._shift[i].x,
          y: position[1] - this._shift[i].y
        };
      });
    this.updateNodes();
  }

  private dragEnd() {
    this._shift = null;
    this.events.emit(NODE_EVENTS.NODE_CHANGED, true);
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
    try {
      t.node.accept(s.node);
      this.addLink(s, t);
    } catch (e){
      console.log(e);
    }
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

    this.tip.transition()
      .duration(200)
      .style("opacity", .9);
    
    this.tip
      .text(() => {
        return `${message}`;
      });
    
    this.tip
      .style('display', 'block')
      .style('left', (d, i, eles: Element[]) => {
        let ele = eles[i];
        return position[0] - ele.getBoundingClientRect().width / 2 + 'px';
      })
      .style('top', (d, i, eles) => {
        let ele = eles[i];
        return position[1] - ele.getBoundingClientRect().height - 10 + 'px';
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

  public keydown(key: string, e) {
    switch (key) {
      case 'Backspace':
        this.selections.forEach((o) => {
          switch (o.constructor) {
            case CanvasNode:
              this.removeNode(<CanvasNode>o);
            case CanvasLink:
              this.removeLink(<CanvasLink>o);
          }
        });
        this.hideTip();
        this.selections = [];
        break;
    }
  }
}
