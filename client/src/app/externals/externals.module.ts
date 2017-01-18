import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BEEHIVE_RPOVIDERS } from './services/index';
import { RuleApplication } from './rule-application-core';
import { AuthenHelperSerivce } from './services/authen-helper.service';
import { EXTERNAL_CONTROLS } from './controls/index';
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
import { EXTERNAL_INFO_PANEL_COMPONENTS } from './nodes/index';
import { KeysPipe } from '../share/keysPipe';

const EXTERNAL_EDITOR_WRAPPED_CONTROLS = EXTERNAL_CONTROLS
  .map((componentType) => {
    return componentType.wrappedComponent
  }).concat(EXTERNAL_INFO_PANEL_COMPONENTS);


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
    LoginComponent, FlowListComponent, FlowDetailComponent, KeysPipe],
  providers: [BEEHIVE_RPOVIDERS,
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
        authenHelper: AuthenHelperSerivce,
        authen: JNAuthenHelperSerivce,
        translate: TranslateService
      ) => new RuleApplication(appContext, cacheContext,
        configContext, http, events, authenHelper, authen, translate),
      deps: [
        ApplicationContextService, ConfigContextService,
        CacheContextService, Http, Events, AuthenHelperSerivce, JNAuthenHelperSerivce, TranslateService]
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
