import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, Input, ComponentFactoryResolver, Compiler, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'info-panel-wrapper',
  template: '<div #target></div>',
})
export class InfoPanelWrapperComponent implements OnInit {
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
  @Input() type;
  @Input() data;
  componentRef: ComponentRef<Component>;
  private isViewInitialized: boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler,
    private cdRef: ChangeDetectorRef) { }

  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    this.componentRef = this.target.createComponent(factory);
    let component = this.componentRef.instance;
    component.inputs = this.data;
    this.cdRef.detectChanges();
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