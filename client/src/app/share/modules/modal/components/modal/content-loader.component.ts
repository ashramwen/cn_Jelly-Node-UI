import { Component, Input, OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'jn-modal-content-loader',
  template: ''
})
export class JNModalContentLoaderComponent implements OnChanges{
  @Input() content: Function;
  @Input() data: any;

  constructor(
    private containerRef: ViewContainerRef,
    private modalService: ModalService
  ) { }

  ngOnChanges(values: {[key: string]: SimpleChange}) {
    this.modalService.dynamicLoad(this.containerRef, this.content, this.data);
  }
}