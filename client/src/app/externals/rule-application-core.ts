import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { BEEHIVE_HEADERS, JNConfig } from '../jn-config';
import { AuthenHelperSerivce } from './services/authen-helper.service';
import { JNTimeNode } from './nodes/time-node/time-node.type';
import { JNApplication } from '../share/services/application-core.service';
import { ApplicationContextService } from '../share/services/application-context.service';
import { CacheContextService } from '../share/services/cache-context.service';
import { ConfigContextService } from '../share/services/config-context.service';
import { Events } from '../share/services/event.service';
import { JNAuthenHelperSerivce } from '../share/services/authen-helper.service';
import { TranslateService } from 'ng2-translate';
import { cn, en } from '../../assets/i18n';
import { LineChartNode } from './nodes/line-chart-node/line-chart-node.type';


@Injectable()
export class RuleApplication extends JNApplication {
  static instance: RuleApplication;

  get nodeTypeMapper() {
    return {
      Time: JNTimeNode,
      Line: LineChartNode
    };
  }

  constructor(
    public applicationContext: ApplicationContextService,
    public cacheContext: CacheContextService,
    public configContext: ConfigContextService,
    public http: Http,
    public events: Events,
    private authenHelper: AuthenHelperSerivce,
    private authen: JNAuthenHelperSerivce,
    private translate: TranslateService
  ) {
    super(applicationContext, cacheContext, configContext, http, events);
    RuleApplication.instance = this;
    JNApplication.instance = this;
  }

  protected init() {

    this.translate.setDefaultLang('cn');
    this.translate.setTranslation('cn', cn);
    this.translate.setTranslation('en', en);

    return new Promise((resolve, reject) => {
      this.authen.login({ userName: 'beehive_admin', password: '1qaz2wsx' }).then(() => {
        resolve(true);
      });
    });
  }

  protected lazyLoading() {
    return new Promise((resolve) => {
      let pList = [];
      resolve(true);
    });
  }
}
