import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { Component, OnInit, ElementRef } from '@angular/core';
import { JNInfoPanelModel } from './interfaces/info-panel-model.type';
import { Events, NODE_EVENTS } from '../../share/services/event.service';
import { JNApplication, APP_READY } from '../../share/services/application-core.service';

@Component({
  selector: 'jn-info-panel',
  templateUrl: 'info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
})

export class InfoPanelComponent implements OnInit {

  info: Object;
  data: Object;
  infoKeys: Array<String>;
  dataKeys: Array<String>;
  complexDataHTML: String;
  typeComponent;
  complexData;
  width;
  isMouseDown: Boolean;

  constructor(private elementRef: ElementRef, private application: JNApplication, private events: Events) {
    this.width = 200;
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      this.width = this.width - event.movementX;
    }
  }

  onMouseUp(event) {
    this.isMouseDown = false;
  }

  onMouseDown(event) {
    this.isMouseDown = true;
  }

  ngOnInit() {
    this.info = null;
    this.data = null;

    this.events.on(NODE_EVENTS.SELECTION_CHANGED, (nodes: Array<JNBaseNode>) => {
      if (nodes.length === 1) {
        let infoPanel: JNInfoPanelModel = nodes[0].createInfoPanelModel();
        if (infoPanel) {
          this.info = infoPanel.info;
          this.data = infoPanel.data;
          this.complexDataHTML = infoPanel.complexDataHTML;
          this.typeComponent = infoPanel.complexDataComponent;
          this.complexData = infoPanel.complexData;

          this.infoKeys = Object.keys(this.info);
          this.dataKeys = Object.keys(this.data);
        }
      } else {
        this.info = null;
        this.data = null;
      }
    });
  }
}
