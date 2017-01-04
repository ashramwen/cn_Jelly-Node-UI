import { NgModule, Provider } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ExternalsModule } from './externals/externals.module';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from 'ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";


/*
* Platform and Environment
* our providers/directives/pipes
*/
@NgModule({
  imports: [
    ExternalsModule, AppRoutingModule, HttpModule, TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
