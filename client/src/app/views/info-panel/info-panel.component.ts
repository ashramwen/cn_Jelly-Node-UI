import { JNApplication, APP_READY } from '../../core/services/application-core.service';
import { Events } from '../../core/services/event.service';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { Component, OnInit } from '@angular/core';
import { JNInfoPanelModel } from './interfaces/info-panel-model.type';

@Component({
    selector: 'jn-info-panel',
    templateUrl: 'info-panel.component.html',
    styleUrls: ['./info-panel.component.scss']
})

export class InfoPanelComponent implements OnInit {

    info: Object;
    data: Object;
    infoKeys: Array<String>;
    dataKeys: Array<String>;

    constructor(private application: JNApplication, private events: Events) {
    }

    ngOnInit() {
        this.events.on('node_click', (node: JNBaseNode) => {
            let infoPanel: JNInfoPanelModel = node.createInfoPanelModel();
            if (infoPanel) {
                this.info = infoPanel.info;
                this.data = infoPanel.data;
                
                this.infoKeys = Object.keys(this.info);
                this.dataKeys = Object.keys(this.data);
                infoPanel.init();
            }
            console.log('info panel', infoPanel);
        });
    }
}