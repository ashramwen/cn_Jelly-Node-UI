import { NgModule } from '@angular/core';
import { JNViewModule } from '../views/view.module';
import { JNSharedModule } from '../share/share.module';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    JNViewModule, JNSharedModule.forRoot()
  ],
  exports: [JNViewModule, JNSharedModule]
})
export class CoreModule { }
