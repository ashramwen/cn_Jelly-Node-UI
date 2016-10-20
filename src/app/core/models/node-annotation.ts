import { INodeOptions } from './interfaces';
import { JNBaseNode } from './jn-base-node.type';

declare const Reflect: any;

export function JNNode(options: INodeOptions) {
  return function (node: JNBaseNode) {
    node['icon'] = options.icon;
    node['color'] = options.color;
    node['borderColor'] = options.borderColor;
    node['accepts'] = options.accepts;
  };
}
