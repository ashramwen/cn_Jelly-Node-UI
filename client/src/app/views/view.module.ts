import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NodeEditorModule } from './node-editor';

import { FlowComponent } from './flow/flow.component';
import { FlowDetailComponent } from './flow/flow-detail/flow-detail.component';
import { PaletteComponent } from './palette/palette.component';
import { NodeCanvasComponent } from './node-canvas/node-canvas.component';

@NgModule({
  imports: [BrowserModule, NodeEditorModule],
  exports: [],
  declarations: [
    FlowComponent,
    FlowDetailComponent,
    PaletteComponent,
    NodeCanvasComponent
  ],
  providers: []
})
export class JNViewModule { }
