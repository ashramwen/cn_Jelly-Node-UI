import { Component, Injectable, ComponentFactory, NgModule, Input, ViewContainerRef } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';
import { MaterialModule } from '@angular/material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { JNFormControl } from '../controls/control.component';
import { JNControlModule } from '../controls/control.module';
import { IJNFormControlInput } from '../interfaces/form-control-input.interface';
import { IJNFormControl } from '../interfaces/form-control.interface';
import { JNTemplateBuilder } from './template-builder.service';
import { ValidatorGenerator } from '../controls/services/validator-generator.service';
import { BrowserModule } from '@angular/platform-browser';

interface IDynamicComponent {
  inputs: IJNFormControlInput;
  formControl: FormControl;
}

@Injectable()
export class JNControlLoader {

  constructor(
    private compiler: RuntimeCompiler,
    private templateBuilder: JNTemplateBuilder,
    private validatorGenerator: ValidatorGenerator
  ) { }

  public buildComponent(controlSchema: IJNFormControl, dynamicComponentTarget: ViewContainerRef) {
    return new Promise<IDynamicComponent>((resolve) => {
      let template = this.templateBuilder.prepareTemplate(controlSchema);

      // here we get Factory (just compiled or from cache)
      this.createComponentFactory(template)
        .then((factory) => {
          // Target will instantiate and inject component 
          let componentRef = dynamicComponentTarget
              .createComponent(factory);

          let component = componentRef.instance;
          let fc = new FormControl();
          let validators = this.validatorGenerator.generate(controlSchema.$validators);

          component.formControl = fc;
          fc.setAsyncValidators(validators.map(validator => validator.$validator));

          this.injectInputs(component, controlSchema.input);
          resolve(component);
        });
    });
  }

  private injectInputs(component: IDynamicComponent, formInputs: IJNFormControlInput) {
    component.inputs = formInputs;
  }

  private createComponentFactory(template: string): Promise<ComponentFactory<IDynamicComponent>> {
     // unknown template ... let's create a Type for it
    let type = this.createNewComponent(template);
    let myModule = this.createComponentModule(type);

    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(myModule)
            .then((moduleWithFactories) => {
              let factory = moduleWithFactories.componentFactories.find(e => e.componentType === type);
              resolve(factory);
            });
    });
  }

  private createNewComponent (tmpl: string) {
    @Component({
        selector: 'dynamic-component',
        template: tmpl
    })
    class CustomDynamicComponent  implements IDynamicComponent {

      @Input() public inputs: IJNFormControlInput;
      @Input() public formControl: FormControl;
    };
    // a component for this particular template
    return CustomDynamicComponent;
  }

  private createComponentModule (componentType: any) {
      @NgModule({
        imports: [
          JNControlModule,
          ReactiveFormsModule,
          BrowserModule
        ],
        declarations: [
          componentType
        ]
      })
      class RuntimeComponentModule { }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
