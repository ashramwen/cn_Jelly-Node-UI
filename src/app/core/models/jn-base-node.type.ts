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

  /**
   * @returns void
   * @desc listens all published messages in the linked road
   */
  protected abstract listener(): void; // listener
  
  /**
   * @param  {Object} data
   * @returns Promise
   * @desc deserialize raw data to data model
   */
  protected abstract parser(data: Object): Promise<IJNNodeModel>;

  /**
   * @returns Promise
   * @desc serialize data model
   */
  protected abstract formatter(): Promise<Object>;

  /**
   * @returns Object
   * @desc produce output data for publisher
   */
  protected abstract buildOutput(): Object;


  /**
   * @param  {JNBaseNode} node
   * @desc description
   */
  protected accept(node: JNBaseNode) {
    this.inputFlows.push(node);
    node.output.subscribe(this.listener);
  }
  

  constructor() {
    
  }

  
  /**
   * @param  {Object} data
   * @desc update node by given data and publish new body
   */
  public update(data: Object) { 
    this.parser(data).then((model) => {
      let payload: IJNNodePayload = {
        type: this.constructor,
        data: this.buildOutput(),
        valid: model.$valid,
        error: model.$error
      };

      this.stream.next(payload);
    });
  };

  /**
   * @param  {JNBaseNode} target output node
   * @returns boolean
   * @desc if thow target is coonectable
   */
  public connectable(target: JNBaseNode): boolean {
    return true;
  }
}
