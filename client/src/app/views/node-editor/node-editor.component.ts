import { Component, ViewContainerRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ApplicationContextService } from '../../core/services';
import { FormBuilder, FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { JNTemplateBuilder } from './services/template-builder.service';
import { JNControlLoader } from './services/control-loader.service';
import { JNTextControl } from './controls/components/text/text.component';
import { IJNFormControl } from './interfaces/form-control.interface';
import { IJNFormControlInput } from './interfaces/form-control-input.interface';

@Component({
  selector: 'jn-node-editor',
  template: require('./node-editor.html'),
  styles: [require('./node-editor.scss')]
})
export class JNEditFormComponent implements OnInit {
  @ViewChild('dynamicTarget', { read: ViewContainerRef })
  private dynamicComponentTarget: ViewContainerRef;

  private componentRefList: Array<any> = [];
  private activityForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private controlBuilder: JNControlLoader,
  ) { }

  ngOnInit() {
    let controlSchema: IJNFormControl = {
      input: {
        label: '规则名称',
        data: {
          maxLength: 50
        }
      },
      controlType: JNTextControl,
      $validators: [{
        validator: (fc: FormControl) => {
          return new Promise((resolve, reject) => {
            if (fc.value && fc.value.length > 10) {
              resolve(false);
              return;
            }
            resolve(true);
          });
        },
        errorName: 'maxLength',
        msg: '最大长度不可超过10'
      }]
    };

    this.controlBuilder.buildComponent(controlSchema, this.dynamicComponentTarget)
      .then((component) => {
        this.activityForm.addControl('aname', component.formControl);
      });
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
