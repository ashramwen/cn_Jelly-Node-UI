import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { FlowDetailService } from './flow-detail.service';
import { AppEventListener } from '../../../share/services/event-listener.type';
import { Events, NODE_EVENTS } from '../../../share/services/event.service';
import { APP_READY } from '../../../share/services/application-core.service';
import { JNViewComponent } from '../../../views/view.component';
import { JNLoader } from '../../../share/modules/loader/services/loader.service';
import { ModalService } from '../../../share/modules/modal/services/modal.service';
import { BUTTON_STYLES } from '../../../share/modules/modal/components/modal/modal.component';

@Component({
  selector: 'app-flow-detail',
  templateUrl: './flow-detail.component.html',
  styleUrls: ['./flow-detail.component.scss'],
  host: {
    '[tabindex]': '1'
  }
})
export class FlowDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  id: string;
  subs: Subscription;
  nodeFlow: JNFlow;
  editingName: boolean;
  fullscreen: boolean;
  scale: number;

  @ViewChild('flowNameTxt')
  flowNameTxt: ElementRef;

  @ViewChild('nodeView')
  nodeView: JNViewComponent;

  get isNew() {
    return !this.nodeFlow || !this.nodeFlow.flowID;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private events: Events,
    private flowDetailService: FlowDetailService,
    private elementRef: ElementRef,
    private loader: JNLoader,
    private viewContainer: ViewContainerRef,
    private modalService: ModalService
  ) {
    this.editingName = false;
  }

  ngOnInit() {
    this.events.on(APP_READY, () => {
      this.subs = this.route.params.subscribe(params => {
        this.flowDetailService.getFlow(params['id'])
          .then((flow) => {
            this.nodeFlow = flow;
          });
      });
      
      this.modalService.setRoot(this.viewContainer);
    });
    setInterval(() => {
      this.fullscreen = this.flowDetailService.fullscreen;
    }, 500);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngAfterViewInit() {
    this.scale = this.nodeView.nodeCanvas.currentScale * 100;
  }

  startEditingName() {
    this.editingName = true;
    this.nodeFlow.flowName = this.nodeFlow.flowName || 'Untitled Rule';
    setTimeout(() => {
      (<HTMLInputElement>this.flowNameTxt.nativeElement).focus();
    });
  }

  stopEditingName() {
    this.editingName = false;
  }

  toggleFullScreen() {
    let element = this.elementRef.nativeElement.querySelector('.main-container');
    this.flowDetailService.toggleFullScreen(element);
    setTimeout(() => {
      this.fullscreen = this.flowDetailService.fullscreen;
    }, 1000);
  }

  publish() {
    
    let callback = () => {
      let loader = this.loader.showLoader(this.viewContainer);
      if (this.isNew) {
        this.flowDetailService.saveFlow(this.nodeFlow)
          .then((flow) => {
            this.flowDetailService
              .publishFlow(flow)
              .then(() => {
                loader.dismiss();
                this.router.navigate(['/flow']);
              }, () => {
                loader.dismiss();
              });
          });
      } else {
        this.flowDetailService
          .publishFlow(this.nodeFlow)
          .then(() => {
            loader.dismiss();
            this.router.navigate(['/flow']);
          }, () => {
            loader.dismiss();
          });
      }
    };
    
    let modal;
    let options = {
      content: '是否确认要发布视图?',
      icon: 'fa-save',
      buttons: [{
        text: '确认',
        style: BUTTON_STYLES.SUCCESS,
        callback: callback
      }, {
        text: '取消',
        style: BUTTON_STYLES.PRIMARY,
        callback: () => {
          modal.dismiss();
        } 
      }]
    };
      
    modal = this.modalService
      .createModal(options);
      
    modal.show();
  }

  submit() {
    let modal = null;
    let toSubmit = () => {
      let loader = this.loader.showLoader(this.viewContainer);
      this.flowDetailService.saveFlow(this.nodeFlow)
        .then((flow: JNFlow) => {
          this.router.navigate(['/flow']);
          loader.dismiss();
        }, () => {
          loader.dismiss();
        });
    };

    let options = {
      content: '是否确认要保存视图?',
      icon: 'fa-save',
      buttons: [{
        text: '确认',
        style: BUTTON_STYLES.SUCCESS,
        callback: toSubmit
      }, {
        text: '取消',
        style: BUTTON_STYLES.PRIMARY,
        callback: () => {
          modal.dismiss();
        } 
      }]
    };
      
    modal = this.modalService
      .createModal(options);
      
    modal.show();
  }

  scaleTxtBlur(event) {
    let s = this.flowDetailService.calcScale(this.scale);
    this.nodeView.nodeCanvas.scale(s);
    this.refreshScale();
  }

  toggleDragMove() {
    if (this.nodeView.nodeCanvas.dragEnabled) {
      this.nodeView.nodeCanvas.disableDragMove();
    } else {
      this.nodeView.nodeCanvas.enableDragMove();
    }
  }

  enableRule() {
    if (this.nodeFlow.enabled) return;

    let loader = this.loader.showLoader(this.viewContainer);
    this.flowDetailService.enableRule(this.nodeFlow)
      .then(() => {
        this.nodeFlow.enabled = true;
        loader.dismiss();
      }, () => {
        loader.dismiss();
      });
  }

  disableRule() {
    if (!this.nodeFlow.enabled) return;

    let loader = this.loader.showLoader(this.viewContainer);
    
    this.flowDetailService.disableRule(this.nodeFlow).then(() => {
      this.nodeFlow.enabled = false;
      loader.dismiss();
    }, () => {
      loader.dismiss();
    });
  }

  toggleEnable() {
    this.nodeFlow.enabled ? this.disableRule() : this.enableRule();
  }

  zoomIn() {
    this.nodeView.nodeCanvas.scale(this.nodeView.nodeCanvas.currentScale + 0.2);
    this.refreshScale();
  }

  zoomOut() {
    this.nodeView.nodeCanvas.scale(this.nodeView.nodeCanvas.currentScale - 0.2);
    this.refreshScale();
  }

  refreshScale() {
    this.scale = Math.floor(this.nodeView.nodeCanvas.currentScale * 100);
  }
}
