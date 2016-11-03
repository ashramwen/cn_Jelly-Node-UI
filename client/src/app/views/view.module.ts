import { NgModule } from '@angular/core';
import { NodeEditorModule } from './node-editor';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [NodeEditorModule, MaterialModule.forRoot(), ReactiveFormsModule],
  exports: [MaterialModule],
  providers: []
})
export class JNViewModule { }
