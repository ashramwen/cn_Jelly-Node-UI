import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BEEHIVE_RESOURCES } from './resources/index';
import { BEEHIVE_RPOVIDERS } from './services/index';
import { Http } from '@angular/http';
import { RuleApplication } from './rule-application-core';
import { ResourceProviders } from 'ng2-resource-rest';
import { AuthenHelperSerivce } from './services/authen-helper.service';
import { ResourceService } from './resources/resources.service';
import { EXTERNAL_CONTROLS } from './controls/index';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JNEditorControlModule } from '../views/node-editor/components/control.module';
import { JNControlsModule } from '../views/controls/controls.module';
import { JNApplication } from '../share/services/application-core.service';
import { ApplicationContextService } from '../share/services/application-context.service';
import { ConfigContextService } from '../share/services/config-context.service';
import { CacheContextService } from '../share/services/cache-context.service';
import { Events } from '../share/services/event.service';
import { JNAuthenHelperSerivce } from '../share/services/authen-helper.service';
import { CoreModule } from '../core/core.module';
import { TranslateService } from 'ng2-translate';
import { JN_NODE_SETTING } from '../share/providers/constants';
import { INodeSettings } from '../views/interfaces/node-settings.interface';
import { JNViewModule } from '../views/view.module';
import { LoginComponent } from './components/login/login.component';
import { FlowListComponent } from './components/flow-list/flow-list.component';
import { FlowDetailComponent } from './components/flow-detail/flow-detail.component';
import { FlowDetailService } from './components/flow-detail/flow-detail.service';
import { FlowListService } from './components/flow-list/flow-list.service';

const EXTERNAL_EDITOR_WRAPPED_CONTROLS = EXTERNAL_CONTROLS
  .map((componentType) => {
    return componentType.wrappedComponent
  });

const NODE_SETTINGS: INodeSettings = {
  // NODE_MAX_WIDTH: 180,
  // NODE_MIN_WIDTH: 100
};

@NgModule({
  imports: [
    BrowserModule, CoreModule, ReactiveFormsModule, FormsModule, JNControlsModule, JNViewModule
  ],
  exports: [LoginComponent, FlowListComponent, FlowDetailComponent],
  declarations: [...EXTERNAL_CONTROLS, ...EXTERNAL_EDITOR_WRAPPED_CONTROLS,
    LoginComponent, FlowListComponent, FlowDetailComponent],
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
        authen: JNAuthenHelperSerivce,
        translate: TranslateService
      ) => new RuleApplication(appContext, cacheContext,
        configContext, http, events, resource, authenHelper, authen, translate),
      deps: [
        ApplicationContextService, ConfigContextService,
        CacheContextService, Http, Events, ResourceService, AuthenHelperSerivce, JNAuthenHelperSerivce, TranslateService]
    },
    {
      provide: JN_NODE_SETTING,
      useValue: NODE_SETTINGS
    },
    FlowDetailService,
    FlowListService
  ]
})
export class ExternalsModule {
  
}
