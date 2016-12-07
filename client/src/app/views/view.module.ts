import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NodeEditorModule } from './node-editor';
import { PaletteComponent } from './palette/palette.component';
import { NodeCanvasComponent } from './node-canvas/node-canvas.component';
import { NodeCanvasModule } from './node-canvas/node-canvas.module';
import { PaletteModule } from './palette/palette.module';
import { InfoPanelModule } from './info-panel/info-panel.module';
import { TranslateModule } from 'ng2-translate';
import { JN_EDITOR_WRAPPED_CONTROLS } from './node-editor/components/controls/index';
import { JNSharedModule } from '../share/share.module';
import { JNViewComponent } from './view.component';

@NgModule({
  imports: [
    BrowserModule, MaterialModule.forRoot(), ReactiveFormsModule, FormsModule,
    NodeEditorModule, NodeCanvasModule, PaletteModule, InfoPanelModule, JNSharedModule
  ],
  exports: [MaterialModule, NodeEditorModule, JNViewComponent],
  declarations: [
    JNViewComponent
  ],
  providers: []
})
export class JNViewModule { }
