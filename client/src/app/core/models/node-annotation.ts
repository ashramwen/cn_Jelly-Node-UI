import { INodeOptions } from './interfaces';
import { JNBaseNode } from './jn-base-node.type';

declare const Reflect: any;

export function JNNode(options: INodeOptions) {
  return function (nodeClass: typeof JNBaseNode) {
    nodeClass.icon = options.icon;
    nodeClass.color = options.color;
    nodeClass.title = options.title;
    nodeClass.borderColor = options.borderColor;
    nodeClass.accepts = options.accepts;
    nodeClass.editorModel = options.editorModel;
    nodeClass.infoModel = options.infoPanelModel;
    nodeClass.paletteModel = options.paletteModel;
  };
}
