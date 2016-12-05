import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { Component, OnInit } from '@angular/core';
import { JNInfoPanelModel } from './interfaces/info-panel-model.type';
import { Events } from '../../share/services/event.service';

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
    complexDataScss: String;

    constructor(private events: Events) {
    }

    add(component: any) {

    }

    ngOnInit() {
        this.events.on('node_click', (node: JNBaseNode) => {
            let infoPanel: JNInfoPanelModel = node.createInfoPanelModel();
            if (infoPanel) {
                this.info = infoPanel.info;
                this.data = infoPanel.data;
                this.complexDataHTML = infoPanel.complexDataHTML;
                this.complexDataScss = infoPanel.complexDataScss;

                this.infoKeys = Object.keys(this.info);
                this.dataKeys = Object.keys(this.data);
                infoPanel.init();
            }
            console.log('info panel', infoPanel);
        });
    }
}