import { Injectable } from '@angular/core';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IFlowResult {
  flowID?: number;
  nodes?: INodeBody[];
}

@Injectable()
export class FlowDetailService {

  buildResult(flow: JNFlow) {
    let result: IFlowResult = {};
    let nodes = flow.nodes.map(n => n.body);
    result.nodes = nodes;
    result.flowID = flow.flowID;
    
    return result;
  }
}