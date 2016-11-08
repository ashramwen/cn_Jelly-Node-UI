import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { JNApplication } from '../core/services/application-core.service';
import { ApplicationContextService } from '../core/services/application-context.service';
import { ConfigContextService } from '../core/services/config-context.service';
import { CacheContextService } from '../core/services/cache-context.service';
import { BEEHIVE_HEADERS, JNConfig } from '../jn-config';
import { AuthenHelperSerivce } from './services/authen-helper.service';
import { Events } from '../core/services/event.service';
import { ResourceService } from './resources/resources.service';
import { CACHE_LOCATION } from './resources/location.type';

@Injectable()
export class RuleApplication extends JNApplication {
  static instance: RuleApplication;

  constructor(
    public applicationContext: ApplicationContextService,
    public cacheContext: CacheContextService,
    public configContext: ConfigContextService,
    public http: Http,
    public events: Events,
    public resources: ResourceService,
    private authenHelper: AuthenHelperSerivce,
  ) {
    super(applicationContext, cacheContext, configContext, http, events);
    RuleApplication.instance = this;
  }

  protected init() {
    return new Promise((resolve, reject) => {
      this.authenHelper.storeCredential({
        accessToken: 'super_token'
      });
      resolve(true);
    });
  }

  protected lazyLoading() {
    return new Promise((resolve) => {
      let pList = [];

      // cache location
      if (!this.resources.$location.isCached) {
        let promise = this.resources.$location.getAll({}, (location) => {
          this.resources.$location.cache(location);
        }).$observable.toPromise();
        pList.push(promise);
      }

      // cache schema
      pList.push(this.resources.$schema.cacheAll());

      Promise.all(pList).then(() => {
        // restore schemas
        this.resources.$schema.restoreSchemas();
        resolve(true);
      });
    });
  }
}