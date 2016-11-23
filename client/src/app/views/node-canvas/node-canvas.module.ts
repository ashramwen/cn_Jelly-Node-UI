import { NgModule } from '@angular/core';
import { NodeCanvasComponent } from './node-canvas.component';
import { NODE_CANVAS_PROVIDERS } from './services/index';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../share/share.module';

@NgModule({
  imports: [FormsModule, BrowserModule, CoreModule, SharedModule],
  exports: [NodeCanvasComponent],
  declarations: [NodeCanvasComponent],
  providers: [...NODE_CANVAS_PROVIDERS],
})
export class NodeCanvasModule { }
