import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { NodeEditorModule } from './node-editor';
import { FlowComponent } from './flow/flow.component';
import { FlowDetailComponent } from './flow/flow-detail/flow-detail.component';
import { PaletteComponent } from './palette/palette.component';
import { NodeCanvasComponent } from './node-canvas/node-canvas.component';
import { NodeCanvasModule } from './node-canvas/node-canvas.module';
import { PaletteModule } from './palette/palette.module';
import { FlowDetailService } from './flow/flow-detail/flow-detail.service';
import { InfoPanelModule } from './info-panel/info-panel.module';

@NgModule({
  imports: [
    BrowserModule, MaterialModule.forRoot(), ReactiveFormsModule,
    NodeEditorModule, NodeCanvasModule, PaletteModule, InfoPanelModule
  ],
  exports: [MaterialModule],
  declarations: [
    FlowComponent,
    FlowDetailComponent
  ],
  providers: [FlowDetailService]
})
export class JNViewModule { }
