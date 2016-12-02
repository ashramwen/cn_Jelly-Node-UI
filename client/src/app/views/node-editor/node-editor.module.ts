import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { JNEditorControlModule } from './components/control.module';
import { JNEditFormComponent } from './node-editor.component';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EDITOR_PROVIDERS } from './services/index';
import { BrowserModule } from '@angular/platform-browser';
import { JNControlContainer } from './components/control-container/control-container.component';
import { JN_EDITOR_WRAPPED_CONTROLS } from './components/controls/index';

@NgModule({
  declarations: [JNEditFormComponent, JNControlContainer, ...JN_EDITOR_WRAPPED_CONTROLS],
  imports: [
    JNEditorControlModule, ReactiveFormsModule, MaterialModule,
    FormsModule, TranslateModule, BrowserModule, 
  ],
  exports: [JNEditFormComponent, JNControlContainer, JNEditorControlModule, ...JN_EDITOR_WRAPPED_CONTROLS],
  providers: [...EDITOR_PROVIDERS, COMPILER_PROVIDERS, {
    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
    multi: true,
    useValue: JN_EDITOR_WRAPPED_CONTROLS
  }]
})
export class NodeEditorModule { }
