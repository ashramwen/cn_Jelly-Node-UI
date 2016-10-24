import { NgModule } from '@angular/core';
import { JNControlModule } from './controls/control.module';
import { JNEditFormComponent } from './node-editor.component';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [JNEditFormComponent],
  imports: [JNControlModule, TranslateModule.forRoot()],
  exports: [JNEditFormComponent],
  providers: []
})
export class NodeEditorModule { }
