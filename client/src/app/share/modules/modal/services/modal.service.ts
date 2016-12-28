import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ComponentRef } from '@angular/core';
import { JNModalComponent, IModalOptions } from '../components/modal/modal.component';
import { JNModalTextComponent } from '../components/modal/text.component';

@Injectable()
export class ModalService{

  private _container: ViewContainerRef;

  constructor(
    private componentResolver: ComponentFactoryResolver
  ) { }

  public setRoot(container: ViewContainerRef) {
    this._container = container;
  }

  public createModal(options: IModalOptions) {
    let factory: ComponentFactory<JNModalComponent> = this.componentResolver
      .resolveComponentFactory(JNModalComponent);
    
    let componentRef: ComponentRef<JNModalComponent> = null;
    
    return {
      show: () => {
        componentRef = this._container.createComponent(factory);
        componentRef.instance.setOptions(options);
        componentRef.instance.componentRef = componentRef;
        return componentRef.instance;
      },
      dismiss: () => {
        if (!componentRef) throw new Error('Modal not created yet.');
        componentRef.instance.dismiss();
      }
    };
  }

  public dynamicLoad(container: ViewContainerRef, content: string | Function, data: any) {
    let component = null;

    if (typeof content === 'string') {
      component = JNModalTextComponent;
    } else if (typeof content === 'function') {
      component = content;
    }
    if (!component) throw new Error('content type is unrecognized!');

    let factory: ComponentFactory<any> = this.componentResolver
      .resolveComponentFactory(component);
    
    let instance = container.createComponent(factory).instance;
    if (typeof content === 'string') {
      (<JNModalTextComponent>instance).content = content;
    } else {
      Object.assign(instance, data);
    }
    return instance;
  }
}