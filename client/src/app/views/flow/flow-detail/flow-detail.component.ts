import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-flow-detail',
  templateUrl: './flow-detail.component.html',
  styleUrls: ['./flow-detail.component.scss']
})
export class FlowDetailComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute) { }

  id: string;
  subs: Subscription;

  ngOnInit() {
    this.subs = this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
