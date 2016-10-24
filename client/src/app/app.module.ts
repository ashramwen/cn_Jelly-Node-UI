import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { JNViewModule } from './views';
import { NodeEditorModule } from './views/node-editor/node-editor.module';

import { FlowComponent } from './views/flow/flow.component';
import { FlowDetailComponent } from './views/flow/flow-detail/flow-detail.component';

/*
* Platform and Environment
* our providers/directives/pipes
*/

@NgModule({
  imports: [BrowserModule, NodeEditorModule, JNViewModule, CoreModule, HttpModule, AppRoutingModule],
  declarations: [
    AppComponent,
    FlowComponent,
    FlowDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
