import { INodePosition, IJNNodePayload } from './interfaces';
import { Observable, Subscriber } from 'rxjs';
import { IJNInfoPanelModel } from '../../views/info-panel/interfaces';
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
import { INodeBody } from './interfaces/node-body.interface';
import { JNUtils } from '../../share/util';
import { JNPaletteModel } from '../../views/palette/interfaces/palette-model.type';

export interface INodeMap {
  accepted: {
    [id: number]: JNBaseNode;
  };
  outputTo: {
    [id: number]: JNBaseNode;
  };
}

export interface IConnectRule {
  message: string;
  validator: (target: JNBaseNode) => boolean;
}

export interface IConnectRuleSetting {
  global?: Array<IConnectRule>;
  nodes?: Array<{
    nodeType: typeof JNBaseNode;
    rules: Array<IConnectRule>;
  }>;
}

export abstract class JNBaseNode {

  static title: string; // static node name
  static icon: String; // node icon diplay on canvas
  static color: String; // node color display on canvas
  static borderColor: String; // node border color on canvas
  static accepts: Array<string> = []; // node types that can be accepted;
  static nodeModel: typeof JNNodeModel;
  static editorModel: typeof JNEditorModel;
  static infoModel: IJNInfoPanelModel;
  static paletteModel: JNPaletteModel;
  static outputable: boolean;

  static connectable(left: typeof JNBaseNode, right: typeof JNBaseNode): boolean {
    return right.accepts
      .map(nodeName => JNApplication.instance.nodeTypeMapper[nodeName])
      .indexOf(left) > -1;
  }

  get name(): String {
    return (<typeof JNBaseNode>this.constructor).title;
  }

  get position(): INodePosition {
    return this.model.position;
  }

  set position(position: INodePosition) {
    this.model.position = position;
  }

  public nodeMap: INodeMap = {
    accepted: {},
    outputTo: {}
  };


  protected abstract model: JNNodeModel<any>; // node model

  /**
   * @desc return body
   */
  public get body() {
    return this.formatter();
  }

  /**
   * @desc connect rules setting.
   *  global rules will be challenged before node rules
   */
  protected connectRules: IConnectRuleSetting = {};

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
  protected parser(data: Object): JNNodeModel<any> {
    return this.model.extends(data);
  }

  /**
   * @returns Promise
   * @desc serialize data model
   */
  protected abstract formatter(): INodeBody;
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
  protected abstract whenReject(node: JNBaseNode): Promise<boolean>;

  /**
   * @param  {JNBaseNode} node
   * @desc description
   */
  public accept(node: JNBaseNode) {
    if (!!this.connectable(node)) {
      throw new JNNodeUnconnectableException(this, node);
    }
    this.nodeMap.accepted[node.body.nodeID] = node;
    node.nodeMap.outputTo[this.body.nodeID] = this;
    node.output.subscribe(this.listener.bind(this));
  }

  /**
   * @param  {JNBaseNode} node
   * @returns {Promise<boolean | JNNodeException>}
   */
  public reject(node: JNBaseNode): Promise<boolean | JNException> {
    return new Promise((resolve, reject) => {
      this.whenReject(node).then(() => {
        delete this.nodeMap.accepted[node.body.nodeID];
        delete node.nodeMap.outputTo[this.body.nodeID];
        resolve(node);
        this.publishData();
      }, (err) => {
        reject(err);
      });
    });
  }

  /**
   * @desc has given node as input
   * @param  {JNBaseNode} node
   */
  public hasAccepted(node: JNBaseNode): boolean {
    return !!JNUtils.toArray<JNBaseNode>(this.nodeMap).find(r => r.value === node);
  }

  constructor(
  ) { }

  /**
   * @param  {Object} data
   * @desc update node by given data and publish new body
   */
  public update(data: Object) {
    this.model = this.parser(data);
    this.publishData();
  };

  /**
   * @param  {Object} data
   */
  public init(data: Object) {
    let model = this.parser(data);
    if (!this.model) {
      this.model = model;
    } else {
      this.model.extends(model);
    }
  }

  /**
   * @desc remove node
   */
  public remove() {
    JNUtils.toArray(this.nodeMap.accepted).forEach((t: { key: string; value: JNBaseNode}) => {
      let node = t.value;
      delete node.nodeMap.outputTo[node.body.nodeID];
    });

    JNUtils.toArray(this.nodeMap.outputTo).forEach((t: { key: string; value: JNBaseNode}) => {
      let node = t.value;
      delete node.nodeMap.accepted[node.body.nodeID];
      node.reject(this);
    });
  }

  /**
   * @param  {JNBaseNode} target output node
   * @returns boolean
   * @desc if thow target is connectable
   */
  public connectable(target: JNBaseNode): { message: string } {
    // type level validation
    let typeValid = this._shouldReject(<typeof JNBaseNode>target.constructor);
    if (typeValid) return typeValid;

    // global rule
    let globalRules = this.connectRules.global;
    if (globalRules && globalRules.length) {
      for (let rule of globalRules) {
        if (!rule.validator(target)) {
          return { message: rule.message };
        }
      }
    }

    // node rule
    if (this.connectRules.nodes && this.connectRules.nodes.length) {
      let node = this.connectRules.nodes.find(_node => _node.nodeType === (<typeof JNBaseNode>target.constructor));
      if (!node) return null;
      let nodeRules = node.rules;
      for (let rule of nodeRules) {
        if (!rule.validator(target)) {
          return { message: rule.message };
        }
      }
    }

    return null;
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
  private _shouldReject(target: typeof JNBaseNode): {message: string} {
    let accepts = (<typeof JNBaseNode>this.constructor).accepts
      .map(nodeName => JNApplication.instance.nodeTypeMapper[nodeName]);
    if (!accepts || !accepts.length) {
      return {
        message: `<${(<typeof JNBaseNode>this.constructor).title}>节点不接受任何输入节点`
      };
    }
    if (accepts.indexOf(target) === -1) {
      return {
        message: `<${(<typeof JNBaseNode>this.constructor).title}>节点只支持与
        ${accepts.map((type) => `<${type.title}>`).join(',')}节点相连。`
      };
    }
    return null;
  }

  private publishData() {
    this.buildOutput().then((output) => {
      let payload: IJNNodePayload = {
        type: this.constructor,
        data: output,
        valid: this.model.$valid,
        error: this.model.$error
      };
      this.stream.next(payload);
    });
  }

}
