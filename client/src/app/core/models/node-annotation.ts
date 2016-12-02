import { INodeOptions } from './interfaces';
import { JNBaseNode } from './jn-base-node.type';
import { JNUtils } from '../../share/util';
import { JNApplication } from '../../share/services/application-core.service';

declare const Reflect: any;

export function JNNode(options: INodeOptions) {
  return function (nodeClass: typeof JNBaseNode) {
    nodeClass.icon = options.icon;
    nodeClass.color = options.color;
    nodeClass.title = options.title;
    nodeClass.borderColor = options.borderColor;
    nodeClass.editorModel = options.editorModel;
    nodeClass.infoModel = options.infoPanelModel;
    nodeClass.paletteModel = options.paletteModel;
    nodeClass.accepts = options.accepts || [];
    nodeClass.modelRules = options.modelRules || [];
    nodeClass.connectRules = options.connectRules || {};

    nodeClass.hasInput = () => {
      return !!nodeClass.accepts.length;
    };

    nodeClass.hasOutput = () => {
      return !!JNUtils.toArray<typeof JNBaseNode>(JNApplication.instance.nodeTypeMapper)
        .map(p => p.value)
        .find((n) => {
          return !!n.accepts.find(t => JNApplication.instance.nodeTypeMapper[t] === nodeClass);
        });
    };
  };
}
