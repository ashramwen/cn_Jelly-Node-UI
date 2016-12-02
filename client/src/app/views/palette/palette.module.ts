import { NgModule } from '@angular/core';

import { PaletteComponent }   from './palette.component';
import { TranslateModule } from 'ng2-translate';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JNSharedModule } from '../../share/share.module';

@NgModule({
  imports: [TranslateModule, FormsModule, BrowserModule, JNSharedModule],
  exports: [PaletteComponent],
  declarations: [PaletteComponent],
  providers: [],
})
export class PaletteModule { }
