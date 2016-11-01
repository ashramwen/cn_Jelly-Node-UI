import { NgModule } from '@angular/core';
import { BEEHIVE_RESOURCES } from './resources/index';
import { BEEHIVE_RPOVIDERS } from './services/index';
import { JNApplication } from '../core/services/application-core.service';
import { ApplicationContextService } from '../core/services/application-context.service';
import { ConfigContextService } from '../core/services/config-context.service';
import { CacheContextService } from '../core/services/cache-context.service';
import { Http } from '@angular/http';
import { Events } from '../core/services/event.service';
import { RuleApplication } from './rule-application-core';
import { ResourceProviders } from 'ng2-resource-rest';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [BEEHIVE_RESOURCES, BEEHIVE_RPOVIDERS, {
      provide: JNApplication,
      useFactory: (appContext: ApplicationContextService,
        configContext: ConfigContextService,
        cacheContext: CacheContextService,
        http: Http,
        events: Events
      ) => new RuleApplication(appContext, cacheContext, configContext, http, events),
      deps: [ApplicationContextService, ConfigContextService, CacheContextService, Http, Events]
  }]
})
export class ExternalsModule {
  static forRoot() {
    return {
      ngModule: ExternalsModule,
      providers: [BEEHIVE_RESOURCES, BEEHIVE_RPOVIDERS, {
          provide: JNApplication,
          useFactory: (appContext: ApplicationContextService,
            configContext: ConfigContextService,
            cacheContext: CacheContextService,
            http: Http,
            events: Events
          ) => new RuleApplication(appContext, cacheContext, configContext, http, events),
          deps: [ApplicationContextService, ConfigContextService, CacheContextService, Http, Events]
      }]
    };
  }
}
