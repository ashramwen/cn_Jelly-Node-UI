import { JNApplication, APP_READY } from '../../core/services/application-core.service';
import { Events } from '../../core/services/event.service';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { Component, OnInit } from '@angular/core';
import { JNInfoPanelModel } from './interfaces/info-panel-model.type';
import { JNDeviceTypeInfoPanelModel } from '../../externals/nodes/device-type-node/device-type-node-info-panel-model.type';
import { JNDeviceTypeNode } from '../../externals/nodes/device-type-node/device-type-node.type';

@Component({
  selector: 'jn-info-panel',
  templateUrl: 'info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})

export class InfoPanelComponent implements OnInit {

  constructor(private application: JNApplication, private events: Events) {
  }

  ngOnInit() {
    this.events.on('node_click', (node: JNBaseNode) => {
      node.createInfoPanelModel();
      let infoPanel:JNInfoPanelModel = node.getInfoModel();
    });
  }
}