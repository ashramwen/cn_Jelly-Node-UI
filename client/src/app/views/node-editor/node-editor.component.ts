import { Component, ViewContainerRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ApplicationContextService } from '../../core/services';
import { FormBuilder, FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { JNTemplateBuilder } from './services/template-builder.service';
import { JNControlLoader } from './services/control-loader.service';
import { JNTextControl } from './controls/components/text/text.component';

@Component({
  selector: 'jn-node-editor',
  template: require('./node-editor.html'),
  styles: [require('./node-editor.scss')]
})
export class JNEditFormComponent implements OnInit{
  @ViewChild('dynamicTarget', { read: ViewContainerRef })
  private dynamicComponentTarget: ViewContainerRef;
  private componentRefList: Array<any> = [];
  private formControl: FormControl = new FormControl();

  private data = {
    maxLength: 50
  };
  private value = 10;
  private activityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private controlBuilder: JNControlLoader,
    private templateBuilder: JNTemplateBuilder,
  ) { }

  ngOnInit() {
    /*
    let fc = this.formControl;
    fc.setValue('10');
    this.formControl = fc;

    let validator = this.validatorHelper.generatorValidators([{
      validator: () => {
        return new Promise<any>((resolve) => {
          if (fc.value.length < 10) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      },
      msg: '',
      errorName: 'maxLength'
    }])[0];

    fc.setAsyncValidators([<any>validator.$validator]);

    this.activityForm = new FormGroup({
      0: fc
    });
    */
  }

  submit(value) {
  }

}
