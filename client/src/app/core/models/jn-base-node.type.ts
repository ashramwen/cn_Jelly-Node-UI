import { INodePosition, IJNNodePayload } from './interfaces';
import { Observable, Subscriber } from 'rxjs';
import { IJNInfoPanelModel } from '../../views/info-panel/interfaces';
import { IJNPaletteModel } from '../../views/palette/interfaces';
import {
  ApplicationContextService,
  CacheContextService,
  ConfigContextService
} from '../services';
import { JNNodeModel } from './jn-node-model.type';
import { JNNodeUnconnectableException } from './exceptions/node-unconnectable-exception.type';
import { JNApplication } from '../services/application-core.service';
import { JNException } from './exceptions/exception.type';
import { JNEditorModel } from '../../views/node-editor/interfaces/editor-model.type';


export abstract class JNBaseNode {

  static icon: String; // node icon diplay on canvas
  static color: String; // node color display on canvas
  static borderColor: String; // node border color on canvas
  static accepts: Array<typeof JNBaseNode>; // node types that can be accepted;
  static nodeModel: typeof JNNodeModel;
  static editorModel: typeof JNEditorModel;
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

  /**
   * @desc return body
   */
  public get body() {
    return this.formatter();
  }

  /**
   * @desc accepted nodes
   * @returns Array<JNBaseNode>
   */
  public get acceptedNodes(): Array<JNBaseNode> {
    return this.inputFlows;
  }

  private inputFlows: Array<JNBaseNode> = []; // accepted nodes
  private stream: Subscriber<IJNNodePayload>; // stream publisher
  private output = new Observable((subscriber: Subscriber<IJNNodePayload>) => {
    this.stream = subscriber;
  });

  /**
   * @returns void
   * @desc listens all published messages in the linked road
   */
  protected abstract listener(payload: Object): void; // listener

  /**
   * @param  {Object} data
   * @returns Promise
   * @desc deserialize raw data to data model
   */
  protected parser(data: Object): Promise<JNNodeModel> {
    return new Promise((resolve, reject) => {
      resolve(this.model.extends(data));
    });
  }

  /**
   * @returns Promise
   * @desc serialize data model
   */
  protected abstract formatter(): Object;
  /**
   * @returns Object
   * @desc produce output data for publisher
   */
  protected abstract buildOutput(): Promise<Object>;

  /**
   * @desc update node body when when node is disconnected
   * @param  {JNBaseNode} node
   * @returns Promise
   */
  protected abstract whenRejected(node: JNBaseNode): Promise<boolean>;

  /**
   * @desc should reject connection with given node;
   *       data-level validation;
   * @param  {JNBaseNode} target
   * @returns boolean
   */
  protected shouldReject(target: JNBaseNode): boolean {
    return false;
  }

  /**
   * @param  {JNBaseNode} node
   * @desc description
   */
  public accept(node: JNBaseNode) {
    if (!this.connectable(node)) {
      throw new JNNodeUnconnectableException(this, node);
    }
    this.inputFlows.push(node);
    node.output.subscribe(this.listener.bind(this));
  }

  /**
   * @param  {JNBaseNode} node
   * @returns {Promise<boolean | JNNodeException>}
   */
  public reject(node: JNBaseNode): Promise<boolean | JNException> {
    return new Promise((resolve, reject) => {
      this.whenRejected(node).then(() => {
        this.inputFlows.splice(this.inputFlows.indexOf(node), 1);
        resolve(node);
      }, (err) => {
        reject(err);
      });
    });
  }

  constructor(
  ) { }

  /**
   * @param  {Object} data
   * @desc update node by given data and publish new body
   */
  public update(data: Object) {
    this.parser(data).then((model) => {
      this.model = model;
      this.buildOutput().then((output) => {
        let payload: IJNNodePayload = {
          type: this.constructor,
          data: output,
          valid: model.$valid,
          error: model.$error
        };
        this.stream.next(payload);
      });
    });
  };

  /**
   * @param  {Object} data
   */
  public init(data: Object) {
    return this.parser(data).then((model) => {
      if (!this.model) {
        this.model = model;
      } else {
        this.model.extends(model);
      }
    });
  }

  /**
   * @param  {JNBaseNode} target output node
   * @returns boolean
   * @desc if thow target is connectable
   */
  public connectable(target: JNBaseNode): boolean {
    if (this._shouldReject(<typeof JNBaseNode>target.constructor)) return false;
    if (this.shouldReject(target)) return false;
    return true;
  }

  /**
   * @desc create an editor model instance
   */
  public createEditorModel() {
    let clazz = <typeof JNBaseNode>(this.constructor);
    let editorModel: JNEditorModel = new (<any>clazz.editorModel);
    editorModel.load(this.model);
    return editorModel;
  }

  /**
   * @desc type-level connectable check
   * @param  {typeof JNBaseNode} target
   */
  private _shouldReject(target: typeof JNBaseNode): boolean {
    let accepts: Array<typeof JNBaseNode> = this.constructor['accepts'];
    return accepts.indexOf(target) > -1;
  }
}
