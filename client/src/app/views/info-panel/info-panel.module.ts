import { TranslateModule } from 'ng2-translate';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JNSharedModule } from '../../share/share.module';
import { InfoPanelComponent } from './info-panel.component';
import { InfoPanelWrapperComponent } from './info-panel-wrapper.component';

@NgModule({
  imports: [TranslateModule, FormsModule, BrowserModule, JNSharedModule],
  exports: [InfoPanelComponent],
  declarations: [InfoPanelComponent, InfoPanelWrapperComponent],
  providers: [],
  
})
export class InfoPanelModule { }
