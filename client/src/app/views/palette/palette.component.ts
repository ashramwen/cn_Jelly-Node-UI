// import * as d3 from "d3";
import { ApplicationContextService } from './../../core/services/application-context.service';
import { ConfigContextService } from './../../core/services/config-context.service';
import { CacheContextService } from './../../core/services/cache-context.service';
import { Component, OnInit } from '@angular/core';

import { JNApplication } from '../../core/services/application-core.service';
import { IJNNodeModel } from './../../core/models/interfaces/node-model.interface';
import { JNNodeModel } from './../../core/models/jn-node-model.type';
import { JNDeviceTypeNodeModel } from './../../externals/nodes/device-type-node/device-type-node-model.type';
import {JNBaseNode} from '../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from './../../externals/nodes/device-type-node/device-type-node.type';

@Component({
  selector: 'jn-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {
  constructor( private application: JNApplication) { }

  nodes: JNBaseNode[]

  ngOnInit() {
    // d3.drag();
    // let node = new JNDeviceTypeNode(this.application);
    // node.body()
    // node.position = { x: 10, y: 20 };

    this.nodes.push(new JNDeviceTypeNode(this.application));
    // this.nodes.push(Object.assign({}, node));
  }
}