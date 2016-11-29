import { TranslateModule } from 'ng2-translate';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../share/share.module';
import { InfoPanelComponent } from './info-panel.component';

@NgModule({
  imports: [TranslateModule, FormsModule, BrowserModule, SharedModule],
  exports: [InfoPanelComponent],
  declarations: [InfoPanelComponent],
  providers: [],
})
export class InfoPanelModule { }
