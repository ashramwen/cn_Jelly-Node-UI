import { JNApplication } from '../core/services/application-core.service';
import { ApplicationContextService } from '../core/services/application-context.service';
import { ConfigContextService } from '../core/services/config-context.service';
import { CacheContextService } from '../core/services/cache-context.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BEEHIVE_HEADERS, JNConfig } from '../jn-config';
import { CREDENTIAL } from './services/authen-helper.service';

@Injectable()
export class RuleApplication extends JNApplication {

  protected init() {
    return new Promise((resolve, reject) => {
      this.cacheContext.set(CREDENTIAL, 'super_token');
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
