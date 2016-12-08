import { Injectable } from '@angular/core';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Http } from '@angular/http';
import { JNConfig } from '../../../jn-config';
import { NodeFlowResource } from '../../../share/resources/flow.type';


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

  toggleFullScreen(element) {
    !this.fullscreen ? this._launchIntoFullscreen(element) : this._exitFullscreen();
  }

  calcScale(s) {
    return Math.ceil(s / 20) / 5;
  }

  private _launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  // Whack fullscreen
  private _exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  get fullscreen() { 
    if (document.webkitIsFullScreen !== undefined) {
      return document.webkitIsFullScreen;
    } else if(document['isFullScreen'] !== undefined){
      return document['isFullScreen'];
    } else if (document['mozIsFullScreen'] !== undefined) {
      return document['mozIsFullScreen'];
    }
  }
}