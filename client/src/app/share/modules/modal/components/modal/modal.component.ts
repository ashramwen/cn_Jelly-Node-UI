import { Component, Input, ViewChild, ViewContainerRef, OnChanges, SimpleChange, ViewEncapsulation, ComponentRef } from '@angular/core';

interface IModalButton {
  text: string;
  callback: Function;
  style: BUTTON_STYLES
}

export enum BUTTON_STYLES {
  DANGER, WARNING, SUCCESS, PRIMARY
}

export interface IModalOptions{
  content: string | Function;
  data?: any;
  buttons?: IModalButton[];
  icon: string;
}

@Component({
  selector: 'jn-modal',
  styleUrls: [
    './modal.component.scss'
  ],
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class JNModalComponent {

  public componentRef: ComponentRef<JNModalComponent>;
  private content: Function | string;
  private data: any;
  private icon: string;
  private buttons: IModalButton[];
  private styles = {
    [BUTTON_STYLES.DANGER]: 'danger',
    [BUTTON_STYLES.SUCCESS]: 'success',
    [BUTTON_STYLES.WARNING]: 'warning',
    [BUTTON_STYLES.PRIMARY]: 'primary',
  }

  @ViewChild('modalContent', { read: ViewContainerRef })
  private modalContent: ViewContainerRef;


  constructor(
    private viewContainer: ViewContainerRef
  ) { }

  setOptions(options: IModalOptions) {
    Object.assign(this, options);
  }

  dismiss() {
    this.componentRef.destroy();
  }

}