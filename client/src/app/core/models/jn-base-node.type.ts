import { INodePosition, IJNNodePayload } from './interfaces';
import { JNNodeError } from './exceptions';
import { Observable, Subscriber } from 'rxjs';
import { IJNInfoPanelModel } from '../../views/info-panel/interfaces';
import { IJNEditorModel } from '../../views/node-editor/interfaces';
import { IJNPaletteModel } from '../../views/palette/interfaces';
import {
  ApplicationContextService,
  CacheContextService,
  ConfigContextService
} from '../services';
import { JNNodeModel } from './jn-node-model.type';


export abstract class JNBaseNode {

  static icon: String; // node icon diplay on canvas
  static color: String; // node color display on canvas
  static borderColor: String; // node border color on canvas
  static accepts: Array<JNBaseNode>; // node types that can be accepted;
  static editorModel: IJNEditorModel;
  static infoModel: IJNInfoPanelModel;
  static paletteModel: IJNPaletteModel;

  get name(): String {
    return this.model.nodeName;
  }

  get position(): INodePosition {
    return this.model.position;
  }

  set position(position: INodePosition) {
    this.model.position = position;
  }

  protected abstract model: JNNodeModel; // node model
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
  protected abstract parser(data: Object): Promise<JNNodeModel>;

  /**
   * @returns Promise
   * @desc serialize data model
   */
  protected abstract formatter(): Promise<Object>;
  /**
   * @returns Object
   * @desc produce output data for publisher
   */
  protected abstract buildOutput(): Promise<Object>;

  /**
   * @param  {JNBaseNode} node
   * @desc description
   */
  protected accept(node: JNBaseNode) {
    this.inputFlows.push(node);
    node.output.subscribe(this.listener);
  }
  
  constructor(
    protected applicationContext: ApplicationContextService,
    protected configContext: ConfigContextService,
    protected cacheContext: CacheContextService
  ) {}

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

      this.model = model;

      this.stream.next(payload);
    });
  };

  public init(data: Object) {
    this.parser(data).then((model) => {
      let payload: IJNNodePayload = {
        type: this.constructor,
        data: this.buildOutput(),
        valid: model.$valid,
        error: model.$error
      };

      this.model = model;
    });
  }

  /**
   * @param  {JNBaseNode} target output node
   * @returns boolean
   * @desc if thow target is coonectable
   */
  public connectable(target: JNBaseNode): boolean {
    return true;
  }
}
