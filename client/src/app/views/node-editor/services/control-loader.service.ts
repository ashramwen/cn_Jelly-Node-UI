import { Component, Injectable, ComponentFactory, NgModule, Input, ViewContainerRef } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';
import { MaterialModule } from '@angular/material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { JNEditorControlModule } from '../components/control.module';
import { IJNEditorFormControlInput } from '../interfaces/form-control-input.interface';
import { IJNFormControl } from '../interfaces/form-control.interface';
import { JNTemplateBuilder } from './template-builder.service';
import { ValidatorGenerator } from '../components/services/validator-generator.service';
import { BrowserModule } from '@angular/platform-browser';
import { JNEditorModel } from '../interfaces/editor-model.type';
import { Request } from '@angular/http';
import { JNControlsModule } from '../../controls/controls.module';
import { ApplicationContextService } from '../../../core/services/application-context.service';
import { JN_EDITOR_CONTROLS } from '../components/controls/index';

interface IDynamicComponent {
  inputs: IJNEditorFormControlInput;
  formControl: FormControl;
}

@Injectable()
export class JNControlLoader {

  constructor(
    private compiler: RuntimeCompiler,
    private templateBuilder: JNTemplateBuilder,
    private validatorGenerator: ValidatorGenerator,
    private applicationContext: ApplicationContextService
  ) {
    // this.preloadControls();
  }

  /*  
  public buildFormGroup(nodeEditorModel: JNEditorModel, dynamicComponentTarget: ViewContainerRef) {
    let promises = [];
    nodeEditorModel.literal((fieldName, controlSchema) => {
      promises.push(this.buildComponent(controlSchema, dynamicComponentTarget));
    });
    return Promise.all(promises);
  }
  */

  public buildComponent(controlSchema: IJNFormControl, dynamicComponentTarget: ViewContainerRef) {
    return new Promise<IDynamicComponent>((resolve) => {
      let template = this.templateBuilder.prepareTemplate(controlSchema.controlType);
      // here we get Factory (just compiled or from cache)
      this.createComponentFactory(template)
        .then((factory) => {
          // Target will instantiate and inject component 
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
    });
  }

  public preloadControls() {
    let controlTypes = JN_EDITOR_CONTROLS;
    let templates = controlTypes
      .map(c => this.templateBuilder.prepareTemplate(c));
    let components = templates
      .map(tmpl => this.createNewComponent(tmpl));

    let myModule = this.createComponentsModule(components);

    return new Promise((resolve) => {
      this.compiler
        .compileModuleAndAllComponentsAsync(myModule)
        .then((moduleWithFactories) => {
          components.forEach((controlType, index) => {
            let template = templates[index];
            let factory = moduleWithFactories
              .componentFactories
              .find(e => e.componentType === controlType);
            this.applicationContext.set(template, factory);
          });
          resolve();
        });
    });
  }


  private injectInputs(component: IDynamicComponent, formInputs: IJNEditorFormControlInput) {
    component.inputs = formInputs;
  }

  private createComponentFactory(template: string): Promise<ComponentFactory<IDynamicComponent>> {
     // unknown template ... let's create a Type for it
    let type = this.createNewComponent(template);
    let myModule = this.createComponentsModule([type]);
    let _factory = this.applicationContext.get(template);
    if (_factory) return Promise.resolve(_factory);

    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(myModule)
            .then((moduleWithFactories) => {
              let factory = moduleWithFactories.componentFactories.find(e => e.componentType === type);
              this.applicationContext.set(template, factory);
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
      @Input() public inputs: IJNEditorFormControlInput;
      @Input() public formControl: FormControl;
    };
    // a component for this particular template
    return CustomDynamicComponent;
  }

  private createComponentsModule (componentTypes: Array<any>) {
      @NgModule({
        imports: [
          JNEditorControlModule,
          ReactiveFormsModule,
          BrowserModule
        ],
        declarations: [
          ...componentTypes
        ]
      })
      class RuntimeComponentModule { }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
