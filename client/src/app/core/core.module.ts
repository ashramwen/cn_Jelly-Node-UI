import { NgModule, Provider } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { ResourceModule } from 'ng2-resource-rest';

import { PROVIDERS } from './services';
import { JNApplication } from './services/application-core.service';
import { ApplicationContextService } from './services/application-context.service';
import { CacheContextService } from './services/cache-context.service';
import { ConfigContextService } from './services/config-context.service';
import { RuleApplication } from '../externals/rule-application-core';
import { Events } from './services/event.service';
import { ExternalsModule } from '../externals/externals.module';


// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
  prefix: 'jn-app',
  storageType: 'sessionStorage'
};
// Provide the config to the service:
const LOCAL_STORAGE_CONFIG_PROVIDER: Provider = {
  provide: LOCAL_STORAGE_SERVICE_CONFIG,
  useValue: localStorageServiceConfig
};

@NgModule({
  imports: [
    // vendors
    HttpModule, TranslateModule.forRoot(), MaterialModule.forRoot(), ResourceModule.forRoot(),

    // app
    ExternalsModule.forRoot()
  ],
  exports: [HttpModule, TranslateModule, MaterialModule, ExternalsModule],
  providers: [LocalStorageService, LOCAL_STORAGE_CONFIG_PROVIDER, {
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  }, ...PROVIDERS]
})
export class CoreModule { }
