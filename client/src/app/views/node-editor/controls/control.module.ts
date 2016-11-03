import { NgModule, Provider }      from '@angular/core';
import { JNCONTROLS } from './components/index';
import { TranslateModule } from 'ng2-translate';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EDITOR_CONTROL_SERVICES } from './services/index';

@NgModule({
  imports: [TranslateModule, MaterialModule, FormsModule],
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
