
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { JNViewModule } from './views';
import { ExternalsModule } from './externals/externals.module';
import { TestComponent } from './views/test/test.component';

/*
* Platform and Environment
* our providers/directives/pipes
*/
@NgModule({
  imports: [ BrowserModule, JNViewModule, CoreModule, ExternalsModule, HttpModule, AppRoutingModule ],
  declarations: [ AppComponent, TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
