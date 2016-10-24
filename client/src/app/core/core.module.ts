import { NgModule, Provider } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate';
import { HttpModule, Http} from '@angular/http';

import { PROVIDERS } from './services';


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
  imports: [HttpModule, TranslateModule.forRoot(), MaterialModule.forRoot()],
  exports: [HttpModule, TranslateModule, MaterialModule],
  providers: [LocalStorageService, LOCAL_STORAGE_CONFIG_PROVIDER, {
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  }, ...PROVIDERS]
})
export class CoreModule { }
