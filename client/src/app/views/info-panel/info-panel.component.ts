import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { Component, OnInit, ElementRef } from '@angular/core';
import { JNInfoPanelModel } from './interfaces/info-panel-model.type';
import { Events } from '../../share/services/event.service';
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

  constructor(private elementRef: ElementRef, private application: JNApplication, private events: Events) {
  }

  ngOnInit() {
    this.info = {};
    this.data = {};
    this.events.on('node_click', (node: JNBaseNode) => {
      let infoPanel: JNInfoPanelModel = node.createInfoPanelModel();
      if (infoPanel) {
        this.info = infoPanel.info;
        this.data = infoPanel.data;
        this.complexDataHTML = infoPanel.complexDataHTML;
        this.typeComponent = infoPanel.complexDataComponent;

        // //remove old style
        // var oldStyle = this.elementRef.nativeElement.querySelector('#complex-data-style')
        // if (oldStyle) {
        //   this.elementRef.nativeElement.querySelector('#complex-data').removeChild(oldStyle);
        // }

        // //insert complex data style
        // var style = document.createElement('style');
        // style.setAttribute('id', 'complex-data-style');
        // style.innerHTML = infoPanel.complexDataScss;
        // this.elementRef.nativeElement.querySelector('#complex-data').appendChild(style);

        this.infoKeys = Object.keys(this.info);
        this.dataKeys = Object.keys(this.data);
        infoPanel.init();
      }
      console.log('info panel', infoPanel);
    });
  }
}