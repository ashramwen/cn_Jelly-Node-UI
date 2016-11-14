import * as $ from 'jquery';
import 'jqueryui';
// import * as d3 from "d3";
import { ApplicationContextService } from './../../core/services/application-context.service';
import { ConfigContextService } from './../../core/services/config-context.service';
import { CacheContextService } from './../../core/services/cache-context.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { JNFlow } from './../../core/models/jn-flow.type';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNLocationNode } from './../../externals/nodes/location-node/location-node.type';
<<<<<<< HEAD
import { IJNPaletteNode } from './palette-node.type';
import { RuleApplication } from '../../externals/rule-application-core';
import { JNDeviceTypeNode } from '../../externals/nodes/device-type-node/device-type-node.type';
import { JNDevicePropertyNode } from '../../externals/nodes/device-property-node/device-property-node.type';
import { JNLocationPaletteModel } from '../../externals/nodes/location-node/location-node-palette-model.type';
import { JNRuleNode } from '../../externals/nodes/rule-node/rule-node.type';
import { JNConditionNode } from '../../externals/nodes/condition-node/condition-node.type';
=======
import { JNApplication } from '../../core/services/application-core.service';
>>>>>>> master

@Component({
  selector: 'jn-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit, AfterViewInit {
  constructor(private application: JNApplication) { }

  nodes: IJNPaletteNode[]

  ngOnInit() {
    let nodeFlow = new JNFlow();
    this.nodes = [];
    
    let locationNode = new JNLocationNode();


    // this.nodes.push(nodeFlow.createNode(JNLocationNode));
    // this.nodes.push(nodeFlow.createNode(JNDeviceTypeNode));
    // console.log(this.nodes);
  }

  ngAfterViewInit() {
    $('.ui-draggable').draggable({
      helper: 'clone',
      appendTo: '#chart',
      revert: true,
      revertDuration: 50,
      // containment: '',
      drag: function (e, ui) {
        // console.log(ui);
      }
    });
  }
}

