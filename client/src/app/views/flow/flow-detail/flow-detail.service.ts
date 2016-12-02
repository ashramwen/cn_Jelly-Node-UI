import { Injectable } from '@angular/core';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Http } from '@angular/http';
import { JNConfig } from '../../../jn-config';
import { NodeFlowResource } from '../../../core/resources/flow.type';


@Injectable()
export class FlowDetailService {

  constructor(
    private http: Http,
    private flowResource: NodeFlowResource
  ) { }

  saveFlow(flow: JNFlow) {
    if (!!flow.flowID) {
      return this.flowResource
        .update(flow.serialize())
        .$observable.toPromise()
    } else {
      return this.flowResource
        .save(flow.serialize())
        .$observable.toPromise();
    }
  }

  getFlow(flowID: string) {
    if (!flowID || flowID === 'new') {
      let nodeFlow = new JNFlow();
      nodeFlow.flowType = 'genericRule';
      return Promise.resolve(nodeFlow);
    } else {
      return this.flowResource.get({ flowID: flowID })
      .$observable
      .map((d) => {
        let flow = JNFlow.deserialize(d);
        flow.loadData(d.nodes);
        return flow;
      }).toPromise();
    }
  }
}