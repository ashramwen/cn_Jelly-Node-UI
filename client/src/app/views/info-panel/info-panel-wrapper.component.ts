import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, Input, ComponentFactoryResolver, Compiler } from '@angular/core';

@Component({
  selector: 'info-panel-wrapper',
  template: '<div #target></div>'
})
export class InfoPanelWrapperComponent implements OnInit {
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
  @Input() type;
  componentRef: ComponentRef<Component>;
  private isViewInitialized: boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler) { }

  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    this.componentRef = this.target.createComponent(factory);
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  ngOnInit() {
  }
}