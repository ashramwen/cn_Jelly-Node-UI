import { Component, ViewContainerRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ApplicationContextService } from '../../core/services';
import { FormBuilder, FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { JNTemplateBuilder } from './services/template-builder.service';
import { JNControlLoader } from './services/control-loader.service';
import { JNTextControl, ITextInput } from './components/controls/text/text.component';
import { IJNFormControl } from './interfaces/form-control.interface';
import { IJNFormControlInput } from './interfaces/form-control-input.interface';
import { IRadioInputs, JNRadioControl } from './components/controls/radio/radio.component';

@Component({
  selector: 'jn-node-editor',
  template: require('./node-editor.html'),
  styles: [require('./node-editor.scss')]
})
export class JNEditFormComponent implements OnInit {

  private activityForm: FormGroup = new FormGroup({});
  private controlSchemas: Array<IJNFormControl> = [];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    let input: ITextInput = {
      label: '规则名称',
      maxLength: 50
    };

    let radioInputs: IRadioInputs = {
      label: '何时出发',
      options: [
        { text: '由假转真', value: 'FALSE_TO_TRUE' },
        { text: '由真转假', value: 'TRUE_TO_FALSE' },
        { text: '改变', value: 'CHANGE' }
      ]
    };

    this.controlSchemas = [
      {
        input: input,
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
      },
      {
        input: radioInputs,
        controlType: JNRadioControl,
        $validators: []
      }
    ];
  }

  onControlReady(formControl: FormControl, i: number, schema) {
    formControl.valueChanges.subscribe(function() {
      console.log(formControl.value, formControl.valid, formControl.errors);
    });
    this.activityForm.addControl(i.toLocaleString(), formControl);
  }

  submit(value) {
  }

}
