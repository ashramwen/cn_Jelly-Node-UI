import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { cn, en } from '../assets/i18n';

import { JNDeviceTypeNode } from './externals/nodes/device-type-node/device-type-node.type';
import { LocalStorageService } from 'angular-2-local-storage';

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
        private appContext: ApplicationContextService, private cacheContext: CacheContextService,
        private configContext: ConfigContextService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('cn');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('cn');

        setTimeout(() => {
            translate.set('APP_NAME', 'NODE_RED', 'cn');
        }, 1000);

        translate.setTranslation('cn', cn);
        translate.setTranslation('en', en);
        appContext.set('a', '123');

        setTimeout(() => {
            // this.logParamTypes(this.test, 'appContext');
        }, 3000);
    }

    ngOnInit() {
        let deviceType = new JNDeviceTypeNode(this.appContext, this.configContext, this.cacheContext);
        setTimeout(function() {
            deviceType.init({
                typeName: 'Lighting',
                typeDisplayName: '灯泡',
                position: {
                    x: 100,
                    y: 100
                },
                nodeID: 123,
                nodeName: '类型-灯泡'
            }).then(() => {
                console.log(deviceType.body);
            // console.log(JSON.stringify(deviceType.body));
            // expect(deviceType.body['typeName']).toEqual('Lighting');
            // expect(deviceType.body['position']).toEqual({ x: 100, y: 100 });
            });
        }, 3000);
    }
}
