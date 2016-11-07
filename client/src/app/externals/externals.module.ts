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
import { AuthenHelperSerivce } from './services/authen-helper.service';
import { ResourceService } from './resources/resources.service';

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
        events: Events,
        resource: ResourceService,
        authenHelper: AuthenHelperSerivce
      ) => new RuleApplication(appContext, cacheContext,
        configContext, http, events, resource, authenHelper),
      deps: [
        ApplicationContextService, ConfigContextService,
        CacheContextService, Http, Events, ResourceService, AuthenHelperSerivce]
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
            events: Events,
            resource: ResourceService,
            authenHelper: AuthenHelperSerivce
          ) => new RuleApplication(appContext, cacheContext, configContext, http, events, resource, authenHelper),
          deps: [ApplicationContextService, ConfigContextService,
            CacheContextService, Http, Events, ResourceService, AuthenHelperSerivce]
      }]
    };
  }
}
