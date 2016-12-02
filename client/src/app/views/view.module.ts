import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NodeEditorModule } from './node-editor';
import { FlowComponent } from './flow/flow.component';
import { FlowDetailComponent } from './flow/flow-detail/flow-detail.component';
import { PaletteComponent } from './palette/palette.component';
import { NodeCanvasComponent } from './node-canvas/node-canvas.component';
import { NodeCanvasModule } from './node-canvas/node-canvas.module';
import { PaletteModule } from './palette/palette.module';
import { FlowDetailService } from './flow/flow-detail/flow-detail.service';
import { InfoPanelModule } from './info-panel/info-panel.module';
import { FlowListComponent } from './flow/flow-list/flow-list.component';
import { FlowListService } from './flow/flow-list/flow-list.service';
import { TranslateModule } from 'ng2-translate';
import { LoginComponent } from './flow/login/login.component';
import { JN_EDITOR_WRAPPED_CONTROLS } from './node-editor/components/controls/index';

@NgModule({
  imports: [
    BrowserModule, MaterialModule, ReactiveFormsModule, FormsModule,
    NodeEditorModule, NodeCanvasModule, PaletteModule, InfoPanelModule,
    TranslateModule
  ],
  exports: [MaterialModule, NodeEditorModule],
  declarations: [
    FlowComponent,
    FlowDetailComponent,
    FlowListComponent,
    LoginComponent
  ],
  providers: [FlowDetailService, FlowListService]
})
export class JNViewModule { }
