import { NgModule } from '@angular/core';
import { JNCONTROLS } from './components/index';
import { Angular2SelectModule, Angular2OptionComponent, Angular2SelectComponent } from '@baumi/angular2-select';
import { TranslateModule } from 'ng2-translate';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';


@NgModule({
  imports: [TranslateModule, Angular2SelectModule, FormsModule, BrowserModule, MaterialModule],
  exports: [...JNCONTROLS],
  declarations: [...JNCONTROLS],
  providers: [],
})
export class JNControlsModule {
  static forRoot() {
    return {
      ngModule: JNControlsModule,
      exports: [...JNCONTROLS]
    };
  }
}
