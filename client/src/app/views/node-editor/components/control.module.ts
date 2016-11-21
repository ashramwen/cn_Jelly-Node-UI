import { NgModule, Provider }      from '@angular/core';
import { JN_EDITOR_CONTROLS } from './controls/index';
import { TranslateModule } from 'ng2-translate';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EDITOR_CONTROL_SERVICES } from './services/index';
import { BrowserModule } from '@angular/platform-browser';
import { JSONEditorModule } from 'ng2-jsoneditor';
import { JNControlsModule } from '../../controls/controls.module';

@NgModule({
  imports: [TranslateModule, MaterialModule,
    FormsModule, BrowserModule, JSONEditorModule, JNControlsModule],
  providers: [],
  declarations: [...JN_EDITOR_CONTROLS],
  exports: [...JN_EDITOR_CONTROLS]
})
export class JNEditorControlModule {
  static forRoot() {
    return {
      ngModule: JNEditorControlModule,
      providers: [...EDITOR_CONTROL_SERVICES],
      exports: [...JN_EDITOR_CONTROLS]
    };
  }
}
