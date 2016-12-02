import { NgModule, Provider } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { JNViewModule } from './views';
import { ExternalsModule } from './externals/externals.module';
import { AppRoutingModule } from './app-routing.module';

/*
* Platform and Environment
* our providers/directives/pipes
*/
@NgModule({
  imports: [
    JNViewModule, CoreModule, ExternalsModule, AppRoutingModule
  ],
  declarations: [ AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
