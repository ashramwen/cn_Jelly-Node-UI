import * as $ from 'jquery';
import 'jqueryui';
// import * as d3 from "d3";
import { ApplicationContextService } from './../../core/services/application-context.service';
import { ConfigContextService } from './../../core/services/config-context.service';
import { CacheContextService } from './../../core/services/cache-context.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { JNFlow } from './../../core/models/jn-flow.type';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from './../../externals/nodes/device-type-node/device-type-node.type';
import { JNLocationNode } from './../../externals/nodes/location-node/location-node.type';

@Component({
  selector: 'jn-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit, AfterViewInit {
  constructor() { }

  nodes: JNBaseNode[]

  ngOnInit() {
    let nodeFlow = new JNFlow();
    this.nodes = [];
    this.nodes.push(nodeFlow.createNode(JNLocationNode));
    this.nodes.push(nodeFlow.createNode(JNDeviceTypeNode));
  }

  ngAfterViewInit() {
    $('.ui-draggable').draggable({
      helper: 'clone',
      appendTo: '#chart',
      // containment: '',
      drag: function (e, ui) {
        // console.log('palette drag start.');
      },
      stop: function (e, ui) {
        // console.log('palette drag stop.');
      }
    });
  }
}

