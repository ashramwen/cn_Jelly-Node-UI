import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { JNApplication } from '../core/services/application-core.service';
import { ApplicationContextService } from '../core/services/application-context.service';
import { ConfigContextService } from '../core/services/config-context.service';
import { CacheContextService } from '../core/services/cache-context.service';
import { BEEHIVE_HEADERS, JNConfig } from '../jn-config';
import { AuthenHelperSerivce } from './services/authen-helper.service';
import { Events } from '../core/services/event.service';
import { ResourceService } from './resources/resources.service';
import { CACHE_LOCATION } from './resources/location.type';
import { JNLocationNode } from './nodes/location-node/location-node.type';
import { JNDeviceTypeNode } from './nodes/device-type-node/device-type-node.type';
import { JNDevicePropertyNode } from './nodes/device-property-node/device-property-node.type';
import { JNConditionNode } from './nodes/condition-node/condition-node.type';
import { JNConjunctionNode } from './nodes/conjunction-node/conjunction-node.type';
import { JNRuleNode } from './nodes/rule-node/rule-node.type';
import { JNActionNode } from './nodes/action-node/action-node.type';
import { JNApiNode } from './nodes/api-node/api-node.type';
import { JNTimeNode } from './nodes/time-node/time-node.type';

@Injectable()
export class RuleApplication extends JNApplication {
  static instance: RuleApplication;

  constructor(
    public applicationContext: ApplicationContextService,
    public cacheContext: CacheContextService,
    public configContext: ConfigContextService,
    public http: Http,
    public events: Events,
    public resources: ResourceService,
    private authenHelper: AuthenHelperSerivce,
  ) {
    super(applicationContext, cacheContext, configContext, http, events);
    RuleApplication.instance = this;
    JNApplication.instance = this;
  }

  protected init() {
    this.nodeTypeMapper = {
      Location: JNLocationNode,
      DeviceType: JNDeviceTypeNode,
      DeviceProperty: JNDevicePropertyNode,
      Condition: JNConditionNode,
      Conjunction: JNConjunctionNode,
      Rule: JNRuleNode,
      DeviceAction: JNActionNode,
      Api: JNApiNode,
      Time: JNTimeNode
    };

    return new Promise((resolve, reject) => {
      this.authenHelper.storeCredential({
        accessToken: '0fcdeb6d3b51d5dbabfd83d83c5655f23c979604'
      });
      resolve(true);
    });
  }

  protected lazyLoading() {
    return new Promise((resolve) => {
      let pList = [];

      // cache location
      if (!this.resources.$location.isCached) {
        let promise = this.resources.$location.getAll({}, (location) => {
          this.resources.$location.cache(location);
        }).$observable.toPromise();
        pList.push(promise);
      }

      // cache schema
      pList.push(this.resources.$schema.cacheAll());

      Promise.all(pList).then(() => {
        // restore schemas
        this.resources.$schema.restoreSchemas();
        resolve(true);
      });
    });
  }
}
