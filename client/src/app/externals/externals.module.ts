import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
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
import { JNAuthenHelperSerivce } from '../core/services/authen-helper.service';
import { EXTERNAL_CONTROLS } from './controls/index';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JNViewModule } from '../views/view.module';
import { JNEditorControlModule } from '../views/node-editor/components/control.module';
import { JNControlsModule } from '../views/controls/controls.module';

export const EXTERNAL_EDITOR_WRAPPED_CONTROLS = EXTERNAL_CONTROLS
  .map((componentType) => {
    return componentType.wrappedComponent
  });

@NgModule({
  imports: [
    BrowserModule, MaterialModule, ReactiveFormsModule, FormsModule, JNControlsModule
  ],
  exports: [],
  declarations: [...EXTERNAL_CONTROLS, ...EXTERNAL_EDITOR_WRAPPED_CONTROLS],
  providers: [BEEHIVE_RESOURCES, BEEHIVE_RPOVIDERS,
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      multi: true,
      useValue: EXTERNAL_EDITOR_WRAPPED_CONTROLS
    }
    , {
      provide: JNApplication,
      useFactory: (appContext: ApplicationContextService,
        configContext: ConfigContextService,
        cacheContext: CacheContextService,
        http: Http,
        events: Events,
        resource: ResourceService,
        authenHelper: AuthenHelperSerivce,
        authen: JNAuthenHelperSerivce
      ) => new RuleApplication(appContext, cacheContext,
        configContext, http, events, resource, authenHelper, authen),
      deps: [
        ApplicationContextService, ConfigContextService,
        CacheContextService, Http, Events, ResourceService, AuthenHelperSerivce, JNAuthenHelperSerivce]
  }]
})
export class ExternalsModule {
  
}
