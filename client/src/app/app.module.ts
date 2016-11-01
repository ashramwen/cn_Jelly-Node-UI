
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { JNViewModule } from './views';

/*
* Platform and Environment
* our providers/directives/pipes
*/

@NgModule({
  imports: [BrowserModule, FormsModule, JNViewModule, CoreModule, HttpModule, AppRoutingModule],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
