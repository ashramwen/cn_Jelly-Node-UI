import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import { JNFlow } from './core/models/jn-flow.type';
import { JNApplication } from './share/services/application-core.service';
import { Events } from './share/services/event.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { ResourceParams } from 'ng2-resource-rest';

const cn = require('../assets/i18n/cn.json');
const en = require('../assets/i18n/en.json');


@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  styles: [
    require('jsoneditor/dist/jsoneditor.min.css'),
    require('../assets/styles/theme.scss'),
    require('font-awesome/css/font-awesome.css')
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    private application: JNApplication,
    private events: Events,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log(en);
    // translate.setTranslation('cn', cn);
    // translate.setTranslation('en', en);
    this.translate.use('en');
  }

  ngOnInit() {
  }
}
