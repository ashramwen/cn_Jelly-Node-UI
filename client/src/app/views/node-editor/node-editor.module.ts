import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { JNEditorControlModule } from './components/control.module';
import { JNEditFormComponent } from './node-editor.component';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EDITOR_PROVIDERS } from './services/index';
import { BrowserModule } from '@angular/platform-browser';
import { JNControlContainer } from './components/control-container/control-container.component';

@NgModule({
  declarations: [JNEditFormComponent, JNControlContainer],
  imports: [
    JNEditorControlModule.forRoot(), FormsModule,
    ReactiveFormsModule, MaterialModule, TranslateModule, BrowserModule
  ],
  exports: [JNEditFormComponent],
  providers: [...EDITOR_PROVIDERS, COMPILER_PROVIDERS]
})
export class NodeEditorModule { }
