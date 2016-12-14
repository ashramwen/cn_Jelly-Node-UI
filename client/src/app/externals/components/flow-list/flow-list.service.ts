import { Injectable } from '@angular/core';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { NodeFlowResource } from '../../../share/resources/flow.type';


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

  publishFlow(flow: JNFlow) {
    return this.flowResource.publish({flowID: flow.flowID}).$observable.toPromise();
  }

  enableFlow(flow: JNFlow) {
    return this.flowResource.enable({ flowID: flow.flowID }).$observable.toPromise();
  }

  disableFlow(flow: JNFlow) {
    return this.flowResource.disable({ flowID: flow.flowID }).$observable.toPromise();
  }  

}