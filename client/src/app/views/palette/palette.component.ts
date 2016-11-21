import * as $ from 'jquery';
import 'jqueryui';
import * as d3 from "d3";
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
import { JNLocationPaletteModel } from '../../externals/nodes/location-node/location-node-palette-model.type';
import { JNRuleNode } from '../../externals/nodes/rule-node/rule-node.type';
import { JNConditionNode } from '../../externals/nodes/condition-node/condition-node.type';
import { JNApplication, APP_READY } from '../../core/services/application-core.service';
import { JNPaletteModel } from './interfaces/palette-model.type';
import { Events } from '../../core/services/event.service';
import { JNDeviceTypePaletteModel } from '../../externals/nodes/device-type-node/device-type-node-palette-model.type';

@Component({
  selector: 'jn-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit, AfterViewInit {
  constructor(private application: JNApplication, private events: Events) { }

  nodeFlow: JNFlow;
  palette: JNPaletteModel;

  ngOnInit() {
    this.nodeFlow = new JNFlow();
    this.nodeFlow.createNode(JNLocationNode);
    this.nodeFlow.createNode(JNDeviceTypeNode);
    console.log('node flow', this.nodeFlow);

    //init
    this.palette = new JNPaletteModel();
    this.events.on(APP_READY, () => {
      this.palette.init();
      //test
      let node = new JNDevicePropertyNode();
      this.palette = node.createPaletteModel();
      console.log('palette', this.palette);
      //node selected
      this.events.on('node_click', node => {
        this.palette = node.createPaletteModel();
    });
    })
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

