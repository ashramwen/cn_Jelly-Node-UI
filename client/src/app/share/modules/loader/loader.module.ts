import { NgModule } from '@angular/core';
import { JNSpinner } from './components/spinner/spinner.component';
import { JNLoader } from './services/loader.service';

@NgModule({
  declarations: [JNSpinner],
  entryComponents: [JNSpinner],
  providers: [JNLoader]
})
export class JNLoaderModule {
}
