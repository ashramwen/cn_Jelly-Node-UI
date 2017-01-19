import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { BEEHIVE_HEADERS, JNConfig } from '../jn-config';
import { AuthenHelperSerivce } from './services/authen-helper.service';
import { JNApplication } from '../share/services/application-core.service';
import { ApplicationContextService } from '../share/services/application-context.service';
import { CacheContextService } from '../share/services/cache-context.service';
import { ConfigContextService } from '../share/services/config-context.service';
import { Events } from '../share/services/event.service';
import { JNAuthenHelperSerivce } from '../share/services/authen-helper.service';
import { TranslateService } from 'ng2-translate';
import { cn, en } from '../../assets/i18n';
import { JNFilterNode } from './nodes/filter-node/filter-node.type';
import { BucketNode } from './nodes/bucket-node/bucket-node.type';
import { LineChartNode } from './nodes/charts/line-chart-node/line-chart-node.type';
import { MetricNode } from './nodes/metric-node/metric-node.type';
import { ExtendNode } from './nodes/extend-node/extend-node.type';
import { DrilldownNode } from './nodes/drilldown-node/drilldown-node.type';
import { SubChartNode } from './nodes/sub-chart-node/sub-chart-node.type';
import { BarChartNode } from './nodes/charts/bar-chart-node/bar-chart-node.type';
import { BubbleChartNode } from './nodes/charts/bubble-chart-node/bubble-chart-node.type';
import { PieChartNode } from './nodes/charts/pie-chart-node/pie-chart-node.type';
import { ScatterChartNode } from './nodes/charts/scatter-chart-node/scatter-chart-node.type';
import { ChartNode } from './nodes/charts/models/chart-node.type';


@Injectable()
export class RuleApplication extends JNApplication {
  static instance: RuleApplication;

  get nodeTypeMapper() {
    return {
      Filter: JNFilterNode,
      LineChart: LineChartNode,
      Chart: ChartNode,
      Bucket: BucketNode,
      Metric: MetricNode,
      Extend: ExtendNode,
      Drilldown: DrilldownNode,
      SubChart: SubChartNode,
      BarChart: BarChartNode,
      BubbleChart: BubbleChartNode,
      PieChart: PieChartNode,
      ScatterChart: ScatterChartNode
    };
  }

  get nodeTypes() {
    return [
      LineChartNode,
      BarChartNode,
      BubbleChartNode,
      PieChartNode,
      ScatterChartNode,
      BucketNode,
      MetricNode,
      ExtendNode,
      DrilldownNode,
      SubChartNode
    ];
  }

  constructor(
    public applicationContext: ApplicationContextService,
    public cacheContext: CacheContextService,
    public configContext: ConfigContextService,
    public http: Http,
    public events: Events,
    private authenHelper: AuthenHelperSerivce,
    private authen: JNAuthenHelperSerivce,
    private translate: TranslateService
  ) {
    super(applicationContext, cacheContext, configContext, http, events);
    RuleApplication.instance = this;
    JNApplication.instance = this;
  }

  protected init() {

    this.translate.setDefaultLang('cn');
    this.translate.setTranslation('cn', cn);
    this.translate.setTranslation('en', en);

    return new Promise((resolve, reject) => {
      resolve(true);
      // this.authen.login({ userName: 'beehive_admin', password: '1qaz2wsx' }).then(() => {
      //   resolve(true);
      // });
    });
  }

  protected lazyLoading() {
    return new Promise((resolve) => {
      let pList = [];
      resolve(true);
    });
  }
}
