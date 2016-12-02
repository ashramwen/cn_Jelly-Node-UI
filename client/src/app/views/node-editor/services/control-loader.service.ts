import {
  Component, Injectable, ComponentFactory,
  NgModule, Input, ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';
import { MaterialModule } from '@angular/material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { JNEditorControlModule } from '../components/control.module';
import { IJNEditorFormControlInput } from '../interfaces/form-control-input.interface';
import { IJNFormControl } from '../interfaces/form-control.interface';
import { ValidatorGenerator } from '../components/services/validator-generator.service';
import { BrowserModule } from '@angular/platform-browser';
import { JNEditorModel } from '../interfaces/editor-model.type';
import { Request } from '@angular/http';
import { JNControlsModule } from '../../controls/controls.module';
import { JN_EDITOR_CONTROLS } from '../components/controls/index';

interface IDynamicComponent {
  inputs: IJNEditorFormControlInput;
  formControl: FormControl;
}

@Injectable()
export class JNControlLoader {

  constructor(
    private compiler: RuntimeCompiler,
    private validatorGenerator: ValidatorGenerator,
    private componentResolver: ComponentFactoryResolver
  ) {
    // this.preloadControls();
  }

  public buildComponent(controlSchema: IJNFormControl, dynamicComponentTarget: ViewContainerRef) {
    return new Promise<IDynamicComponent>((resolve) => {
      let factory: ComponentFactory<IDynamicComponent> = <any>this.componentResolver
        .resolveComponentFactory(controlSchema.controlType.wrappedComponent);
      
      let componentRef = dynamicComponentTarget
        .createComponent(factory);

      let component = componentRef.instance;
      let validators = this.validatorGenerator.generate(controlSchema.$validators);
      let formControl = controlSchema.formControl;

      component.formControl = formControl;
      formControl.setAsyncValidators(validators.map(validator => validator.$validator));

      this.injectInputs(component, controlSchema.input);

      resolve(component);
    });
  }

  private injectInputs(component: IDynamicComponent, formInputs: IJNEditorFormControlInput) {
    component.inputs = formInputs;
  }
}
