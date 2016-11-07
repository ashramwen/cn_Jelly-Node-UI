import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NodeEditorModule } from './node-editor';

import { D3HelperService } from './../externals/services/d3-helper/d3-helper.service';

import { FlowComponent } from './flow/flow.component';
import { FlowDetailComponent } from './flow/flow-detail/flow-detail.component';
import { PaletteComponent } from './palette/palette.component';
import { NodeCanvasComponent } from './node-canvas/node-canvas.component';

@NgModule({
  imports: [BrowserModule, NodeEditorModule, MaterialModule.forRoot(), ReactiveFormsModule],
  exports: [MaterialModule],
  declarations: [
    FlowComponent,
    FlowDetailComponent,
    PaletteComponent,
    NodeCanvasComponent
  ],
  providers: [D3HelperService]
})
export class JNViewModule { }
