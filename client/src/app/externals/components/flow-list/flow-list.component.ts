import { Component, OnInit } from '@angular/core';
import { FlowListService } from './flow-list.service';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { Router, ActivatedRoute } from '@angular/router';
import { JNUtils } from '../../../share/util';
import { Events } from '../../../share/services/event.service';
import { APP_READY } from '../../../share/services/application-core.service';

@Component({
  selector: 'jn-flow-list',
  template: require('./flow-list.component.html'),
  styles: [require('./flow-list.component.scss')]
})
export class FlowListComponent implements OnInit{
  flows: JNFlow[];

  constructor(
    private flowListService: FlowListService,
    private events: Events,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.flows = [];
  }

  ngOnInit() {
    this.events.on(APP_READY, () => {
      this.flowListService.getFlows()
        .then(flows => {
          this.flows = flows;
        });
    });
  }

  goFlow(flow: JNFlow) {
    this.route.params.subscribe(params => {
      this.router.navigate([params['lan'], 'flow', flow.flowID]);
    });
  }

  createFlow() {
    this.route.params.subscribe(params => {
      this.router.navigate([params['lan'], 'flow', 'new']);
    });
  }

  deleteFlow(flow: JNFlow) {
    this.flowListService.deleteFlow(flow).then(() => {
      JNUtils.removeItem(this.flows, flow);
    });
  }

  publishFlow(flow: JNFlow) {
    this.flowListService.publishFlow(flow).then(() => {
      flow.published = true;
    });
  }
}