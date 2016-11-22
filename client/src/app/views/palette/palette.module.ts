import { NgModule } from '@angular/core';

import { PaletteComponent }   from './palette.component';
import { TranslateModule } from 'ng2-translate';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [TranslateModule, FormsModule, BrowserModule, Ng2DragDropModule],
  exports: [PaletteComponent],
  declarations: [PaletteComponent],
  providers: [],
})
export class PaletteModule { }
