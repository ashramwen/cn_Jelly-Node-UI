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
import { JNApplication } from '../../core/services/application-core.service';

@Component({
  selector: 'jn-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit, AfterViewInit {
  constructor(private application: JNApplication) { }

  // nodes: JNBaseNode[];
  nodeFlow: JNFlow;

  ngOnInit() {
    this.nodeFlow = new JNFlow();
    this.nodeFlow.createNode(JNLocationNode);
    this.nodeFlow.createNode(JNDeviceTypeNode);
  }

  ngAfterViewInit() {
    let self = this;
    $('.ui-draggable').draggable({
      helper: 'clone',
      appendTo: '#chart',
      // containment: '',
      start: function (event, ui) {
        let i = $(this).data('index');
        $(this).data('node', self.nodeFlow.nodes[i]);
      },
      drag: function (e, ui) {
        // console.log('palette drag start.');

      },
      stop: function (e, ui) {
        // console.log('palette drag stop.');
      }
    });
  }
}

