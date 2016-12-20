import { Injectable, ComponentFactoryResolver, ComponentFactory, ViewContainerRef } from '@angular/core';
import { JNSpinner } from '../components/spinner/spinner.component';

@Injectable()
export class JNLoader {

  static instance: JNLoader;

  constructor(
    private componentResolver: ComponentFactoryResolver
  ) { 
    JNLoader.instance = this;
  }

  public showLoader(target: ViewContainerRef) {
    let factory: ComponentFactory<JNSpinner> = this.componentResolver
      .resolveComponentFactory(JNSpinner);
    
    let componentRef = target
      .createComponent(factory);

    return {
      dismiss: () => {
        componentRef.destroy();
      }
    };
  }
}
