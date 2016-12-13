import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';

import { JNFlow } from './../../core/models/jn-flow.type';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNPaletteModel } from './interfaces/palette-model.type';
import { JNPaletteNode } from './interfaces/palette-node.type';
import { JNPaletteConnection } from './interfaces/palette-connections.type';
import { PaletteModule } from './palette.module';
import { JNApplication, APP_READY } from '../../share/services/application-core.service';
import { Events, NODE_EVENTS } from '../../share/services/event.service';
import { NodeSettings } from '../providers/constants';
import { JN_NODE_SETTING } from '../../share/providers/constants';

@Component({
  selector: 'jn-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {

  flowNodes: JNPaletteNode[];
  connections: JNPaletteConnection[];

  private nodeStyle: any;
  private iconStyle: any;
  private portStyle: any;
  private NodeSettings;

  constructor(private application: JNApplication, private events: Events, private injector: Injector) {
    this.flowNodes = [];
    this.connections = [];
    let externalSettings = injector.get(JN_NODE_SETTING);
    this.NodeSettings = {};
    Object.assign(this.NodeSettings, NodeSettings, externalSettings);
    Object.keys(this.NodeSettings).forEach(key => {
      this.NodeSettings[key] = this.NodeSettings[key] + 'px';
    })
    this.nodeStyle = {
      'max-width': NodeSettings.NODE_MAX_WIDTH,
      'min-width': NodeSettings.NODE_MIN_WIDTH, 'border-radius': NodeSettings.NODE_RADIUS, 'height': NodeSettings.NODE_HEIGHT,
      'font-size': NodeSettings.FONT_SIZE
    };
    this.iconStyle = { 'font-size': NodeSettings.NODE_ICON_HOLDER_WIDTH, 'line-height': NodeSettings.NODE_HEIGHT };
    this.portStyle = {
      'width': NodeSettings.HANDLER_WIDTH, 'height': NodeSettings.HANDLER_HEIGHT,
      'border-radius': NodeSettings.HANDLER_RADIUS, 'stroke-width': NodeSettings.PATH_STROKE_WIDTH
    };
    console.log(this.NodeSettings);
  }

  ngOnInit() {
    this.events.on(APP_READY, () => {
      this.flowNodes = JNPaletteModel.getNodes();
      this.events.on(NODE_EVENTS.SELECTION_CHANGED, (nodes: Array<JNBaseNode>) => {
        if (nodes.length == 1) {
          let palette = nodes[0].createPaletteModel();
          this.flowNodes = palette.nodes;
          this.connections = palette.connections;
          console.log('connections', this.connections);

        } else {
          this.flowNodes = JNPaletteModel.getNodes();
          this.connections = [];
        }
      });
      this.events.on(NODE_EVENTS.NODE_DELETE, (node: JNBaseNode) => {
        this.flowNodes = JNPaletteModel.getNodes();
        this.connections = [];
      });
    });
  }
}

