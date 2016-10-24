import { FlowComponent } from './views/flow/flow.component';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { JNViewModule } from './views';
import { NodeEditorModule } from './views/node-editor/node-editor.module';


/*
* Platform and Environment
* our providers/directives/pipes
*/

@NgModule({
  imports: [BrowserModule, NodeEditorModule, JNViewModule, CoreModule, HttpModule, AppRoutingModule],
  declarations: [
    AppComponent,
    FlowComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
