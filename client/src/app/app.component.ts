import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { cn, en } from '../assets/i18n';

import { JNDeviceTypeNode } from './externals/nodes/device-type-node/device-type-node.type';
import { JNLocationNode } from './externals/nodes/location-node/location-node.type';
import { JNDeviceNode } from './externals/nodes/device-node/device-node.type';
import { JNApplication } from './core/services/application-core.service';

import {
  ApplicationContextService,
  CacheContextService,
  ConfigContextService
} from './core/services';

@Component({
    selector: 'app',
    template: '<jn-node-editor></jn-node-editor>'
})
export class AppComponent implements OnInit{

    constructor(private translate: TranslateService,
        private application: JNApplication) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('cn');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('cn');

        setTimeout(() => {
            translate.set('APP_NAME', 'NODE_RED', 'cn');
        }, 1000);

        translate.setTranslation('cn', cn);
        translate.setTranslation('en', en);
        application.applicationContext.set('a', '123');

        setTimeout(() => {
            // this.logParamTypes(this.test, 'appContext');
        }, 3000);
    }

    ngOnInit() {
        setTimeout(() => {
            console.log(JNDeviceTypeNode.accepts);
            let thingNode = new JNDeviceNode(this.application);
            let typeNode = new JNDeviceTypeNode(this.application);
            thingNode.accept(typeNode);
            typeNode.update({typeName: 'typeName', typeDisplayName: 'displayName'});
        }, 3000);
    }
}
