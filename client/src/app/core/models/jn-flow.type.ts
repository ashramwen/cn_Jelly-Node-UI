import { JNBaseNode } from './jn-base-node.type';
import { INodeBody } from './interfaces/node-body.interface';
import { SyncEvent } from 'ts-events';
import { JNUtils } from '../../share/util';
import { Observable, Subscriber } from 'rxjs';
import { Serializable, JsonProperty } from '../../../bin/JsonMapper';
import { IFlow } from './interfaces/flow.interface';
import { JNApplication } from '../../share/services/application-core.service';

@Serializable()
export class JNFlow implements IFlow{
  flowName: string;
  flowDescription: string;

  @JsonProperty({
    serialize: (d: string) => {
      return undefined;
    },
    deserialize: (d: string) => {
      return d;
    }
  })
  createdBy: string;

  @JsonProperty({
    serialize: (id: string) => {
      return id || undefined;
    },
    deserialize: (id: string) => {
      return id;
    }
  })
  flowID: string;

  @JsonProperty({
    serialize: (d: string) => {
      return undefined;
    },
    deserialize: (d: string) => {
      return d;
    }
  })
  published: boolean;

  @JsonProperty({
    serialize: (d: string) => {
      return undefined;
    },
    deserialize: (d: string) => {
      return d;
    }
  })
  synchronized: boolean;

  @JsonProperty({
    serialize: (d: string) => {
      return undefined;
    },
    deserialize: (d: string) => {
      return d;
    }
  })
  enabled: boolean;

  @JsonProperty({
    serialize: (d: string) => {
      return undefined;
    },
    deserialize: (d: string) => {
      return d;
    }
  })
  createdAt: string;

  @JsonProperty({
    serialize: (d: string) => {
      return undefined;
    },
    deserialize: (d: string) => {
      return d;
    }
  })
  updatedAt: string;

  @JsonProperty({
    serialize: (id: string) => {
      return undefined;
    },
    deserialize: (id: string) => {
      return id;
    }
  })
  id: string;

  flowType: 'genericRule' | 'envRule' | 'reporting';

  @JsonProperty({
    serialize: (node: JNBaseNode) => {
      return node.body;
    },
    deserialize: (node: INodeBody) => {
      return null;
    }
  })
  nodes: Array<JNBaseNode>;

  @JsonProperty({ignore: true})
  private _redoStack: Array<any> = [];

  @JsonProperty({ignore: true})
  private _undoStack: Array<any> = [];

  @JsonProperty({ignore: true})
  private _flowChange: SyncEvent<JNBaseNode>;

  @JsonProperty({ignore: true})
  private _subscriber: Subscriber<JNBaseNode>;

  @JsonProperty({ignore: true})
  private _observable = new Observable((subscriber: Subscriber<JNBaseNode>) => {
    this._subscriber = subscriber;
  });

  static deserialize: (d: any) => JNFlow;
  
  constructor() {
    this.flowName = null;
    this.flowID = null;
    this.flowType = null;
    this.flowDescription = null;
    this.published = null;
    this.synchronized = null;
    this.enabled = null;
    this.createdAt = null;
    this.updatedAt = null;
    this.id = null;
    this.nodes = [];

    this._flowChange = new SyncEvent<JNBaseNode>();
    this._observable
      .debounceTime(100)
      .subscribe((node: JNBaseNode) => {
        this._flowChange.post(node);
        console.log(node);
      });
  }

  /**
   * @param  {JNBaseNode} nodeType
   * @desc create new node
   */
  createNode<T extends JNBaseNode>(nodeType: new() => T , data?) {
    let node = JNBaseNode.factory(nodeType, data);
    let _data;
    if (data) {
      if (!data.nodeID) {
        _data = {
          nodeID: this._generateNodeID()
        };
        Object.assign(_data, data);
      }
    } else {
      _data = { nodeID: this._generateNodeID() };
    }
    node.init(_data);
    this.initNode(node);
    this.nodes.push(node);

    return node;
  }

  /**
   * @param  {JNBaseNode} node
   * @desc delete existing node
   */
  removeNode(node: JNBaseNode) {
    if (this.nodes.indexOf(node) > -1) {
      JNUtils.removeItem(this.nodes, node);
      node.remove();
    }
  }

  removeLink(d: { source: JNBaseNode, target: JNBaseNode }) {
    d.target.reject(d.source);
  }

  loadData(data: INodeBody[]) {

    this.nodes = data
      .map(d => {
        let nodeType: typeof JNBaseNode = JNApplication.instance.nodeTypeMapper[d.type];
        let node: JNBaseNode = new (<any>nodeType);
        node.init(d);
        return node;
      });
    
    this.nodes
      .forEach((n) => {
        this.initNode(n);
      });

    this.nodes.forEach((node) => {
      node.body.accepts
        .map((id) => {
          return this.nodes.find(n => n.body.nodeID === id);
        })
        .forEach((sourceNode) => {
          node.accept(sourceNode);
        });
    });
  }

  initNode(node: JNBaseNode) {
    node.onChanges(() => { this.whenNodeUpdated(node); });
  }

  public redo() {
  }

  public undo() {
  }

  public onChanges(cb: any) {
    return this._flowChange.attach(cb);
  }

  public serialize: () => IFlow;

  private _generateNodeID() {
    return new Date().getTime() * 10000 + Math.random() * 10000;
  }

  private whenNodeUpdated(node: JNBaseNode) {
    this._subscriber.next(node);
  }
}
