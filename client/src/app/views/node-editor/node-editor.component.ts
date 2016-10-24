import { Component } from '@angular/core';
import { ApplicationContextService } from '../../core/services'

@Component({
  selector: "jn-node-editor",
  template: require('./node-editor.html'),
  styles: [require('./node-editor.scss')]
})
export class JNEditFormComponent {

  constructor(appContext: ApplicationContextService) {
    console.log(appContext.get('a'));
  }

}