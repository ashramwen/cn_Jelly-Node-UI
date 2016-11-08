import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { cn, en } from '../assets/i18n';

import { JNDeviceTypeNode } from './externals/nodes/device-type-node/device-type-node.type';
import { JNLocationNode } from './externals/nodes/location-node/location-node.type';
import { JNApplication } from './core/services/application-core.service';
import { JNDeviceTypeNodeModel } from './externals/nodes/device-type-node/device-type-node-model.type';
import { Events } from './core/services/event.service';
import { BeehiveThing } from './externals/resources/thing.type';
import { JNFlow } from './core/models/jn-flow.type';

import {
  ApplicationContextService,
  CacheContextService,
  ConfigContextService
} from './core/services';

@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

    constructor(private translate: TranslateService,
        private application: JNApplication, private events: Events, private $thing: BeehiveThing) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('cn');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('cn');

        translate.setTranslation('cn', cn);
        translate.setTranslation('en', en);

        setTimeout(() => {
            translate.set('APP_NAME', 'NODE_RED', 'cn');
        }, 1000);
        let nodeFlow = new JNFlow();
        let node = nodeFlow.createNode(JNLocationNode, { position: { x: 200, y: 200 } });
        let node2 = nodeFlow.createNode(JNDeviceTypeNode, { position: { x: 200, y: 200 } });
        let node3 = nodeFlow.createNode(JNDeviceTypeNode, { position: { x: 200, y: 200 } });

    }

    ngOnInit() {
        setTimeout(() => {
            // let nodeFlow = new JNFlow();
            // let node = nodeFlow.createNode(JNLocationNode);
            // console.log(node);
        }, 3000);
    }
}