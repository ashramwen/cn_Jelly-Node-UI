import { Injectable } from '@angular/core';
import { NodeFlowResource } from '../../../core/resources/flow.type';
import { JNFlow } from '../../../core/models/jn-flow.type';


@Injectable()
export class FlowListService {

  constructor(
    private flowResource: NodeFlowResource
  ) {  }
  
  getFlows() {
    return this.flowResource.getAll().$observable
      .map((d) => {
        return d.map(JNFlow.deserialize);
      }).toPromise();
  }

  deleteFlow(flow: JNFlow) {
    return this.flowResource.delete({ flowID: flow.flowID }).$observable.toPromise();
  }
}