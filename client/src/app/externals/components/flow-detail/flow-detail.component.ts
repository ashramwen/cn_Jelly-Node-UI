import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { FlowDetailService } from './flow-detail.service';
import { AppEventListener } from '../../../share/services/event-listener.type';
import { Events, NODE_EVENTS } from '../../../share/services/event.service';
import { APP_READY } from '../../../share/services/application-core.service';
import { JNViewComponent } from '../../../views/view.component';

@Component({
  selector: 'app-flow-detail',
  templateUrl: './flow-detail.component.html',
  styleUrls: ['./flow-detail.component.scss'],
  host: {
    '[tabindex]': '1'
  }
})
export class FlowDetailComponent implements OnInit, OnDestroy {

  id: string;
  subs: Subscription;
  nodeFlow: JNFlow;
  editingName: boolean;
  fullscreen: boolean;

  @ViewChild('flowNameTxt')
  flowNameTxt: ElementRef;

  @ViewChild('nodeView')
  nodeView: JNViewComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private events: Events,
    private flowDetailService: FlowDetailService,
    private elementRef: ElementRef
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
    });
    setInterval(() => {
      this.fullscreen = this.flowDetailService.fullscreen;
    }, 500);
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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
    },1000);
  }

  submit() {
    this.flowDetailService.saveFlow(this.nodeFlow).then(() => {
      this.router.navigate(['/flow']);
    });
  } 
  
  zoomIn() {
    this.nodeView.scale(this.nodeView.currentScale + 0.2);
  }

  zoomOut() {
    this.nodeView.scale(this.nodeView.currentScale - 0.2);
  }
}
