import { INodePosition, IJNNodePayload, IJNNodeModel } from './interfaces';
import { JNNodeError } from './exceptions';
import { Observable, Subscriber } from 'rxjs';


export abstract class JNBaseNode {

  static icon: String; // node icon diplay on canvas
  static color: String; // node color display on canvas
  static borderColor: String; // node border color on canvas
  static accepts: Array<JNBaseNode>; // node types that can be accepted;

  name: String; // node name
  position: INodePosition; // node position on canvas
  protected model: IJNNodeModel; // node model
  public abstract body: Object; // node data payload

  private inputFlows: Array<JNBaseNode>; // accepted nodes
  private stream: Subscriber<IJNNodePayload>; // stream publisher
  private output = new Observable((subscriber: Subscriber<IJNNodePayload>) => {
    this.stream = subscriber;
  });

  protected abstract listener(): void; // listener
  protected abstract parser(data: Object): IJNNodeModel;
  protected abstract formatter(): Object;
  protected abstract buildOutput(): Object;
  
  protected accept(node: JNBaseNode) {
    this.inputFlows.push(node);
    node.output.subscribe(this.listener);
  }

  

  constructor() {
    
  }
  
  /**
   * @param  {Object} data
   * @description update node by given data and publish new body
   */
  public update(data: Object) { 
    let model = this.parser(data);
    let payload: IJNNodePayload = {
      type: this.constructor,
      data: this.buildOutput(),
      valid: model.$valid,
      error: model.$error
    };

    this.stream.next(payload);
  };

  public connectable(target: JNBaseNode): boolean {
    return true;
  }
}
