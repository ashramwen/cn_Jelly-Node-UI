import { INodeOptions } from './interfaces';
import { JNBaseNode } from './jn-base-node.type';

declare const Reflect: any;

export function JNNode(options: INodeOptions) {
  return function (nodeClass) {
    nodeClass['icon'] = options.icon;
    nodeClass['color'] = options.color;
    nodeClass['borderColor'] = options.borderColor;
    nodeClass['accepts'] = options.accepts;
    nodeClass['editorModel'] = options.editorModel;
    nodeClass['infoPanelModel'] = options.infoPanelModel;
    nodeClass['palettePanelModel'] = options.paletteModel;
  };
}
