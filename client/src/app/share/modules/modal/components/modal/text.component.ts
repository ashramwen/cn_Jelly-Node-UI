import { Component, Input } from '@angular/core';

@Component({
  selector: 'jn-modal-text',
  template: `
    <div class="text-container">
      {{content}}
    </div>
  `,
  styles: [
    `
      div.text-container{
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #456276;
      }
    `
  ]
})
export class JNModalTextComponent {
  @Input()
  public content: string;
}