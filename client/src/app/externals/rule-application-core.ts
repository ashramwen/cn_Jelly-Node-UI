import { JNApplication } from '../core/services/application-core.service';
import { ApplicationContextService } from '../core/services/application-context.service';
import { ConfigContextService } from '../core/services/config-context.service';
import { CacheContextService } from '../core/services/cache-context.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RuleApplication extends JNApplication {

  protected init() {
    return new Promise((resolve, reject) => {
      let beehiveUrl = this.configContext.get('beehiveBaseUrl');
      let apiPrefix = this.configContext.get('apiPrefix');
      let apis = this.configContext.get('apis');
      Object.keys(apis).forEach((key) => {
        apis[key] = [beehiveUrl, apiPrefix, apis[key]].join();
      });
    });
  }

  protected lazyLoading() {
    let apis = this.cacheContext.get('apis');
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
