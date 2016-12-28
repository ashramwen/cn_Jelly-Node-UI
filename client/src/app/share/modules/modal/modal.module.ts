import { NgModule } from '@angular/core';
import { TranslateModule } from 'ng2-translate';
import { ModalService } from './services/modal.service';
import { JNModalComponent } from './components/modal/modal.component';
import { JNModalContentLoaderComponent } from './components/modal/content-loader.component';
import { JNModalTextComponent } from './components/modal/text.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  entryComponents: [JNModalComponent, JNModalTextComponent],
  declarations: [JNModalComponent, JNModalContentLoaderComponent, JNModalTextComponent],
  imports: [ TranslateModule, BrowserModule],
  exports: [JNModalComponent],
  providers: [
    ModalService
  ]
})
export class JNModalModule { }