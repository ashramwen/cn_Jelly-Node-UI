import { ApplicationContextService } from './../../core/services/application-context.service';
import { ConfigContextService } from './../../core/services/config-context.service';
import { CacheContextService } from './../../core/services/cache-context.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { JNFlow } from './../../core/models/jn-flow.type';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNLocationNode } from './../../externals/nodes/location-node/location-node.type';
import { RuleApplication } from '../../externals/rule-application-core';
import { JNDeviceTypeNode } from '../../externals/nodes/device-type-node/device-type-node.type';
import { JNDevicePropertyNode } from '../../externals/nodes/device-property-node/device-property-node.type';
import { JNRuleNode } from '../../externals/nodes/rule-node/rule-node.type';
import { JNConditionNode } from '../../externals/nodes/condition-node/condition-node.type';
import { JNApplication, APP_READY } from '../../core/services/application-core.service';
import { JNPaletteModel } from './interfaces/palette-model.type';
import { Events, NODE_EVENTS } from '../../core/services/event.service';
import { JNPaletteNode } from './interfaces/palette-node.type';
import { JNPaletteConnection } from './interfaces/palette-connections.type';
import { PaletteModule } from './palette.module';

@Component({
  selector: 'jn-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {

  flowNodes: JNPaletteNode[];
  connections: JNPaletteConnection[];

  constructor(private application: JNApplication, private events: Events) {
    this.flowNodes = [];
    this.connections = [];
  }

  ngOnInit() {
    this.events.on(APP_READY, () => {
      this.flowNodes = JNPaletteModel.getNodes();
      this.events.on('node_click', (node: JNBaseNode) => {
        let palette = node.createPaletteModel();
        this.flowNodes = palette.nodes;
        this.connections = palette.connections;
        console.log('palette', palette);
      });
      this.events.on(NODE_EVENTS.SELECTION_CHANGED, (nodes: Array<JNBaseNode>) => {
        if (nodes.length == 1) {
          let palette = nodes[0].createPaletteModel();
          this.flowNodes = palette.nodes;
          this.connections = palette.connections;
        }else {
          this.flowNodes = JNPaletteModel.getNodes();
          this.connections = [];
        }
      })
    });
  }
}

