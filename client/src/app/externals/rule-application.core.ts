import { JNApplication } from '../core/services/application-core.service';
import { ApplicationContextService } from '../core/services/application-context.service';
import { ConfigContextService } from '../core/services/config-context.service';
import { CacheContextService } from '../core/services/cache-context.service';
import { Http } from '@angular/http';

export class RuleApplication extends JNApplication{
  constructor(appContext: ApplicationContextService,
    configContext: ConfigContextService,
    cacheContext: CacheContextService, http: Http) {
    super(appContext, cacheContext, configContext, http);
  }

  protected lazyLoading() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
