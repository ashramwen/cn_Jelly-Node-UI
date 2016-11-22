import { NgModule } from '@angular/core';
import { NodeCanvasComponent } from './node-canvas.component';
import { NODE_CANVAS_PROVIDERS } from './services/index';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { CoreModule } from '../../core/core.module';


@NgModule({
  imports: [FormsModule, BrowserModule, Ng2DragDropModule, CoreModule],
  exports: [NodeCanvasComponent],
  declarations: [NodeCanvasComponent],
  providers: [...NODE_CANVAS_PROVIDERS],
})
export class NodeCanvasModule { }
