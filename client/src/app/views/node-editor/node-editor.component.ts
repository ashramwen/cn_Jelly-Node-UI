import { Component } from '@angular/core';
import { ApplicationContextService } from '../../core/services'

@Component({
  selector: "jn-node-editor",
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class JNEditFormComponent {

  constructor(appContext: ApplicationContextService) {
    console.log(appContext.get('a'));
  }

}