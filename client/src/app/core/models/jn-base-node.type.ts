import { INodePosition, IJNNodePayload } from './interfaces';
import { Observable, Subscriber } from 'rxjs';
import { JNNodeModel } from './jn-node-model.type';
import { JNNodeUnconnectableException } from './exceptions/node-unconnectable-exception.type';
import { JNException } from './exceptions/exception.type';
import { JNEditorModel } from '../../views/node-editor/interfaces/editor-model.type';
import { INodeBody } from './interfaces/node-body.interface';
import { JNUtils } from '../../share/util';
import { JNPaletteModel } from '../../views/palette/interfaces/palette-model.type';
import { SyncEvent } from 'ts-events';
import { JNInfoPanelModel } from '../../views/info-panel/interfaces/info-panel-model.type';
import { NodeError } from './interfaces/node-error.type';
import { JNApplication } from '../../share/services/application-core.service';

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
  static infoModel: typeof JNInfoPanelModel;
  static paletteModel: typeof JNPaletteModel;
  static outputable: boolean;
  static modelRules: { message: string, validator: (model: JNNodeModel<any>) => boolean }[];
  static connectRules: IConnectRuleSetting;

  /**
   * this node type accept other nodes or not
   */
  static hasInput: () => boolean;

  /**
   * this node type output to other nodes or not
   */
  static hasOutput: () => boolean;

  /**
   * @desc test two node is connectable or not
   * @param  {typeofJNBaseNode} left
   * @param  {typeofJNBaseNode} right
   */
  static connectable(left: typeof JNBaseNode, right: typeof JNBaseNode): boolean {
    return right.accepts
      .map(nodeName => JNApplication.instance.nodeTypeMapper[nodeName])
      .indexOf(left) > -1;
  }

  /**
   * @desc get node's name with given data
   * @param  {typeof JNBaseNode} nodeType
   * @param {any} data
   */
  static getName(nodeType: typeof JNBaseNode, data?: any): string {
    return JNBaseNode.factory(<any>nodeType, data).name;
  }

  /**
   * @param  {type of JNBaseNode} type
   * @desc factory a node
   */
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

  get accepted(): JNBaseNode[] {
    return JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
      .map(p => p.value);
  }

  get outputTo(): JNBaseNode[] {
    return JNUtils.toArray<JNBaseNode>(this.nodeMap.outputTo)
      .map(p => p.value);
  }

  protected abstract model: JNNodeModel<any>; // node model
  private _modelChange: SyncEvent<JNBaseNode>;

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
  protected formatter(): INodeBody {
    return this.model.serialize();
  };

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

  get errors() {
    return this.body.errors;
  }

  /**
   * @param  {JNBaseNode} node
   * @desc description
   */
  public accept(node: JNBaseNode) {
    if (!JNBaseNode.connectable(<typeof JNBaseNode>node.constructor, <typeof JNBaseNode>this.constructor)) {
      throw new JNNodeUnconnectableException(this, node);
    }
    this.nodeMap.accepted[node.body.nodeID] = node;
    node.nodeMap.outputTo[this.body.nodeID] = this;
    node.publishData();
    this.update({
      accepts: this.accepted.map(n => n.body.nodeID)
    });
  }

  /**
   * @param  {JNBaseNode} node
   * @returns {Promise<boolean | JNNodeException>}
   */
  public reject(node: JNBaseNode): Promise<boolean | JNException> {
    let nodeAccepted = !!JNUtils
      .toArray<JNBaseNode>(this.nodeMap.accepted)
      .find(p => p.value === node);
    if (!nodeAccepted) return Promise.resolve(true);
    
    return new Promise((resolve, reject) => {
      this.whenReject(node).then(() => {
        delete this.nodeMap.accepted[node.body.nodeID];
        delete node.nodeMap.outputTo[this.body.nodeID];
        
        let errors = this.validate();
        this.update(errors);
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
  ) {
    this._modelChange = new SyncEvent<JNBaseNode>();
  }

  /**
   * @param  {Object} data
   * @desc update node by given data and publish new body
   */
  public update(data: Object) {
    this.model.accepts = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
      .map(p => p.value.body.nodeID);
    this.model = this.parser(data);
    this.model.extends(this.validate());
    this.publishData();
    this._modelChange.post(this);
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
    let errors = this.validate();
    this.model.extends(errors);
    let type = JNUtils.toArray<typeof JNBaseNode>(JNApplication.instance.nodeTypeMapper)
      .find(p => p.value === this.constructor).key;
    this.model.extends({
      type: type
    });
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

  public validateLinkWith(node: JNBaseNode) {
    // type level validation
    let typeValid = this._shouldReject(<typeof JNBaseNode>node.constructor);
    if (typeValid) return typeValid;

    // global rule
    let connectRules = (<typeof JNBaseNode>this.constructor).connectRules;
    let error = this.connectable(node);
    if (error) {
      return error;
    }

    // node rule
    if (connectRules.nodes && connectRules.nodes.length) {
      let n = connectRules.nodes
        .find(_node =>
          JNApplication.instance.nodeTypeMapper[_node.nodeType]
          === (<typeof JNBaseNode>node.constructor));

      if (!n) return null;
      let nodeRules = n.rules;
      for (let rule of nodeRules) {
        if (!rule.validator(this, node)) {
          return { message: rule.message };
        }
      }
    }
    return null;
  }

  /**
   * @param  {JNBaseNode} target output node
   * @returns boolean
   * @desc if thow target is connectable
   */
  public connectable(target: JNBaseNode): { message: string } {
    let connectRules = (<typeof JNBaseNode>this.constructor).connectRules;
    let globalRules = connectRules.global;
    if (globalRules && globalRules.length) {
      for (let rule of globalRules) {
        if (!rule.validator(this, target)) {
          return { message: rule.message };
        }
      }
    }
  }

  /**
   * @desc create an editor model instance
   */
  public createEditorModel(): JNEditorModel {
    let clazz = <typeof JNBaseNode>(this.constructor);
    let editorModel: JNEditorModel = new (<any>clazz.editorModel);
    editorModel.load(this.model.clone());
    return editorModel;
  }

  public createPaletteModel(): JNPaletteModel {
    let clazz = <typeof JNBaseNode>(this.constructor);
    let paletteModel: JNPaletteModel = new (<any>clazz.paletteModel)(this);
    return paletteModel;
  }

  public createInfoPanelModel(): JNInfoPanelModel {
    let clazz = <typeof JNBaseNode>(this.constructor);
    if (clazz.infoModel) {
      let infoModel: JNInfoPanelModel = new (<any>clazz.infoModel)(this);
      return infoModel;
    }
  }

  // public getInfoModel() {
  //   let clazz = <typeof JNBaseNode>(this.constructor);
  //   return (<any>clazz.infoModel);
  // }

  /**
   * @desc model change event listener
   * @param  {any} cb
   * @return {BaseEvent} description
   */
  public onChanges(cb: any) {
    return this._modelChange.attach(cb);
  }

  /**
   * @desc subscribe input data
   * @param  {IJNNodePayload} payload
   */
  protected subscriber(payload: IJNNodePayload) {
    this.listener(payload).then(() => {
      this.publishData();
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
        valid: this.model.valid,
        error: this.model.errors
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
  private validate(): {valid: boolean, errors: NodeError[]} {
    let errors = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
      .map(pair => pair.value)
      .map((node) => {
        return this.validateLinkWith(node);
      });

    let nodeType = <typeof JNBaseNode>this.constructor;
    let modelErrors = nodeType.modelRules
      .map(rule => {
        return rule.validator(this.model) ? null : { message: rule.message };
      });

    errors = errors.concat(modelErrors).filter((err) => {
      return !!err;
    });

    return {
      valid: !!errors.length,
      errors: errors
    };
  }
}
