import { NgModule, Provider }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { AppComponent }  from './app.component';
import { JNViewModule } from './views';
import { NodeEditorModule } from './views/node-editor/node-editor.module';

 
/*
* Platform and Environment
* our providers/directives/pipes
*/

@NgModule({
  imports: [ BrowserModule, NodeEditorModule, JNViewModule, CoreModule ],
  declarations: [ AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
