import { Component, OnInit, AfterViewInit } from '@angular/core';

import { JNFlow } from './../../core/models/jn-flow.type';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNPaletteModel } from './interfaces/palette-model.type';
import { JNPaletteNode } from './interfaces/palette-node.type';
import { JNPaletteConnection } from './interfaces/palette-connections.type';
import { PaletteModule } from './palette.module';
import { JNApplication, APP_READY } from '../../share/services/application-core.service';
import { Events, NODE_EVENTS } from '../../share/services/event.service';

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

