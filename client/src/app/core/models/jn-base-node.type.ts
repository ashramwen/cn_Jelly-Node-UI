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
import { INodeError } from './interfaces/node-error.interface';
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
  validator: (node: JNBaseNode, target: JNBaseNode) => boolean;
}

export interface IConnectRuleSetting {
  global?: Array<IConnectRule>;
  nodes?: Array<{
    nodeType: string;
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
  static modelRules: { message: string, validator: (model: JNNodeModel<any>) => boolean }[];
  static connectRules: IConnectRuleSetting;

  static connectable(left: typeof JNBaseNode, right: typeof JNBaseNode): boolean {
    return right.accepts
      .map(nodeName => JNApplication.instance.nodeTypeMapper[nodeName])
      .indexOf(left) > -1;
  }

  static getName(nodeType: typeof JNBaseNode, data?: any): string {
    return JNBaseNode.factory(<any>nodeType, data).name;
  }

  static factory<T extends JNBaseNode>(type: new () => T, data: any): T {
    let node = new type;
    if (data) node.init(data);
    return node;
  }

  get name(): string {
    return this.getTitle();
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
   * @returns void
   * @desc listens all published messages in the linked road
   */
  protected abstract listener(payload: IJNNodePayload): Promise<any>; // listener

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
   * @desc update node body when when node is disconnected
   * @param  {JNBaseNode} node
   * @returns Promise
   */
  protected abstract whenReject(node: JNBaseNode): Promise<boolean>;

  /**
   * @desc get static node tilte
   */
  protected getTitle() {
    return (<typeof JNBaseNode>this.constructor).title;
  }

  /**
   * @returns IJNNodePayload
   * @desc produce output data for publisher
   */
  protected buildOutput(): Promise<IJNNodePayload> {
    return new Promise((resolve) => {
      resolve(this.model);
    });
  }

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
    let _self = this;

    /*    
    node.output.subscribe((payload) => {
      _self.listener.bind(_self)(payload).then(() => {
        _self.validate();
        _self.buildOutput();
      });
    });
    */
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
        this.validate();
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
    return !!JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
      .find(r => {
        return r.value === node;
      });
  }

  constructor(
  ) { }

  /**
   * @param  {Object} data
   * @desc update node by given data and publish new body
   */
  public update(data: Object) {
    this.model = this.parser(data);
    this.validate();
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
    JNUtils.toArray(this.nodeMap.accepted).forEach((t: { key: string; value: JNBaseNode }) => {
      let node = t.value;
      delete node.nodeMap.outputTo[node.body.nodeID];
    });

    JNUtils.toArray(this.nodeMap.outputTo).forEach((t: { key: string; value: JNBaseNode }) => {
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
    let connectRules = (<typeof JNBaseNode>this.constructor).connectRules;
    let globalRules = connectRules.global;
    if (globalRules && globalRules.length) {
      for (let rule of globalRules) {
        if (!rule.validator(this, target)) {
          return { message: rule.message };
        }
      }
    }

    // node rule
    if (connectRules.nodes && connectRules.nodes.length) {
      let node = connectRules.nodes
        .find(_node =>
          JNApplication.instance.nodeTypeMapper[_node.nodeType]
          === (<typeof JNBaseNode>target.constructor));

      if (!node) return null;
      let nodeRules = node.rules;
      for (let rule of nodeRules) {
        if (!rule.validator(this, target)) {
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
    editorModel.load(this.model.clone());
    return editorModel;
  }

  public createPaletteModel() {
    let clazz = <typeof JNBaseNode>(this.constructor);
    let paletteModel: JNPaletteModel = <any>clazz.paletteModel;
    paletteModel.init(this.body);
    return paletteModel;

  }

  public createInfoPanelModel() {

  }

  /**
   * @desc subscribe input data
   * @param  {IJNNodePayload} payload
   */
  protected subscriber(payload: IJNNodePayload) {
    this.listener(payload).then(() => {
      this.validate();
      this.buildOutput();
    });
  }

  /**
   * @desc type-level connectable check
   * @param  {typeof JNBaseNode} target
   */
  private _shouldReject(target: typeof JNBaseNode): { message: string } {
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
  /**
   * @desc publish data 
   */
  private publishData() {
    this.buildOutput().then((output) => {
      let payload: IJNNodePayload = {
        type: this.constructor,
        data: output,
        valid: this.model.$valid,
        error: this.model.$errors
      };
      JNUtils.toArray<JNBaseNode>(this.nodeMap.outputTo)
        .map(pair => pair.value)
        .forEach((node) => {
          node.subscriber(payload);
        });
    });
  }

  /**
   * @desc validate accepted nodes and node's body; update node's status
   */
  private validate() {
    let errors = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
      .map(pair => pair.value)
      .map((node) => {
        return this.connectable(node);
      });

    let nodeType = <typeof JNBaseNode>this.constructor;
    let modelErrors = nodeType.modelRules
      .map(rule => {
        return rule.validator(this.model) ? null : { message: rule.message };
      });

    errors = errors.concat(modelErrors).filter((err) => {
      return !!err;
    });

    this.model.$errors = errors;
    this.model.$valid = !!errors.length;
  }

}
