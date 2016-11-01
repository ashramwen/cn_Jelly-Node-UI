import { JNApplication } from '../core/services/application-core.service';
import { ApplicationContextService } from '../core/services/application-context.service';
import { ConfigContextService } from '../core/services/config-context.service';
import { CacheContextService } from '../core/services/cache-context.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BEEHIVE_HEADERS, JNConfig } from '../jn-config';
import { CREDENTIAL, AuthenHelperSerivce } from './services/authen-helper.service';
import { Events } from '../core/services/event.service';

@Injectable()
export class RuleApplication extends JNApplication {

  constructor(
    public applicationContext: ApplicationContextService,
    public cacheContext: CacheContextService,
    public configContext: ConfigContextService,
    public http: Http,
    public events: Events,
    private authenHelper: AuthenHelperSerivce
  ) {
    super(applicationContext, cacheContext, configContext, http, events);
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
    let apis = this.cacheContext.get('apis');
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
