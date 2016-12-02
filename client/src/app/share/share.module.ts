import { NgModule } from '@angular/core';
import { SHARED_DIRECTIVES } from './directives/index';
import { DragDropModule } from './directives/drag-drop/index';

@NgModule({
  imports: [DragDropModule],
  exports: [DragDropModule],
  declarations: [],
  providers: [],
})
export class JNSharedModule { }
