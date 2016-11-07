import { NgModule, Provider }      from '@angular/core';
import { JNCONTROLS } from './controls/index';
import { TranslateModule } from 'ng2-translate';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EDITOR_CONTROL_SERVICES } from './services/index';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [TranslateModule, MaterialModule, FormsModule, BrowserModule],
  providers: [],
  declarations: [...JNCONTROLS],
  exports: [...JNCONTROLS]
})
export class JNControlModule {
  static forRoot() {
    return {
      ngModule: JNControlModule,
      providers: [...EDITOR_CONTROL_SERVICES],
      exports: [...JNCONTROLS]
    };
  }
}
