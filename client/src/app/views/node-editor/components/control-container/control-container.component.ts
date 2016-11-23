import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IJNFormControl } from '../../interfaces/form-control.interface';
import { FormControl } from '@angular/forms';
import { JNControlLoader } from '../../services/control-loader.service';

@Component({
  selector: 'jn-control-container',
  template: `
    <div #dynamicTarget></div>
    <div *ngFor="let validator of controlSchema.$validators"
      [hidden]="controlSchema.input.hidden || !controlSchema.formControl.hasError(validator.errorName)">
        {{validator.msg}}
    </div>
  `
})
export class JNControlContainer implements OnInit {
  @Input() public controlSchema: IJNFormControl;
  @Output() public ready: EventEmitter<FormControl> = new EventEmitter<FormControl>();
  @ViewChild('dynamicTarget', { read: ViewContainerRef })
  private dynamicComponentTarget: ViewContainerRef;

  constructor(
    private controlBuilder: JNControlLoader,
  ) {
  }

  ngOnInit() {
    this.controlBuilder.buildComponent(this.controlSchema, this.dynamicComponentTarget)
      .then((component) => {
        this.ready.emit(component.formControl);
      });
  }

}
